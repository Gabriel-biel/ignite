import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { AddressFactory } from 'test/factories/make-address'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { OrderFactory } from 'test/factories/make-order'
import { RecipientFactory } from 'test/factories/make-recipient'
import { waitFor } from 'test/utils/wait-for'
import { PrismaService } from '../database/prisma/prisma.service'
import { DomainEvents } from '@/core/events/domain-events'

describe('On order delivered (E2E)', () => {
  let app: INestApplication
  let accountFactory: AccountFactory
  let recipientFactory: RecipientFactory
  let orderFactory: OrderFactory
  let attachmentFactory: AttachmentFactory
  let addressFactory: AddressFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AccountFactory,
        AddressFactory,
        RecipientFactory,
        OrderFactory,
        AttachmentFactory,
        PrismaService,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    addressFactory = moduleRef.get(AddressFactory)
    orderFactory = moduleRef.get(OrderFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('should send notification when order is delivered', async () => {
    const deliveryman = await accountFactory.makePrismaAccount({
      role: 'DELIVERYMAN',
    })
    const accessToken = jwt.sign({ sub: deliveryman.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    const order = await orderFactory.makePrismaOrder({
      recipientId: recipient.id,
      addressId: address.id,
      deliverymanId: deliveryman.id,
      pickup_available_order: new Date(),
      pickup_at: new Date(),
    })

    const response = await request(app.getHttpServer())
      .put(
        `/orders/delivered/${order.id.toString()}/${recipient.id.toString()}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        attachments: [attachment.id.toString()],
      })

    await waitFor(async () => {
      expect(response.statusCode).toBe(201)
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: recipient.id.toString(),
        },
      })

      expect(notificationOnDatabase).not.toBeNull()
    })
  })
})
