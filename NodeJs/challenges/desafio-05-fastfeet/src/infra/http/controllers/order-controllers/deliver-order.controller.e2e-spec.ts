import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { AddressFactory } from 'test/factories/make-address'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { OrderFactory } from 'test/factories/make-order'
import { OrderAttachmentFactory } from 'test/factories/make-order-attachment'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Deliver order e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let accountFactory: AccountFactory
  let recipientFactory: RecipientFactory
  let addressFactory: AddressFactory
  let orderFactory: OrderFactory
  let attachmentFactory: AttachmentFactory
  let orderAttachmentFactory: OrderAttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PrismaService,
        AccountFactory,
        RecipientFactory,
        AddressFactory,
        OrderFactory,
        AttachmentFactory,
        OrderAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    addressFactory = moduleRef.get(AddressFactory)
    orderFactory = moduleRef.get(OrderFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    orderAttachmentFactory = moduleRef.get(OrderAttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[PUT] /orders/:orderID/:recipientID', async () => {
    const adm = await accountFactory.makePrismaAccount({
      role: 'ADM',
    })
    const admToken = jwt.sign({ sub: adm.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    const attachment1 = await attachmentFactory.makePrismaAttachment()

    const order = await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })

    await orderAttachmentFactory.makePrismaOrderAttachment({
      orderId: order.id,
      attachmentId: attachment1.id,
    })

    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const result = await request(app.getHttpServer())
      .put(`/orders/delivered/${order.id}/${recipient.id}`)
      .set('Authorization', `Bearer ${admToken}`)
      .send({
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(result.statusCode).toBe(201)
    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        id: order.id.toString(),
      },
    })
    expect(orderOnDatabase).toBeTruthy()
    const attachmentOnDatabase = await prisma.attachments.findMany({
      where: {
        orderId: orderOnDatabase?.id,
      },
    })
    expect(attachmentOnDatabase).toHaveLength(2)
    expect(attachmentOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment1.id.toString(),
        }),
        expect.objectContaining({
          id: attachment2.id.toString(),
        }),
      ]),
    )
  })
})
