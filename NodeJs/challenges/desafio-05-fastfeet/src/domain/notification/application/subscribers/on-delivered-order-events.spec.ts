import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { MakeOrder } from 'test/factories/make-order'
import { MakeRecipient } from 'test/factories/make-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnDeliveredOrder } from './on-delivered-order-events'
import { waitFor } from 'test/utils/wait-for'
import { SpyInstance } from 'vitest'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotification: SendNotificationUseCase

let sendoNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Delivered order', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotification = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendoNotificationExecuteSpy = vi.spyOn(sendNotification, 'execute')

    const onDeliveredOrder = new OnDeliveredOrder(
      inMemoryRecipientRepository,
      sendNotification,
    )
  })

  it('should send a notification when a order is delivered', async () => {
    const recipient = MakeRecipient(
      {},
      new UniqueEntityID('recipient-id-for-test'),
    )
    const order = MakeOrder({
      recipientId: recipient.id,
    })

    inMemoryRecipientRepository.create(recipient)
    inMemoryOrderRepository.create(order)

    order.delivered_at = new Date()

    inMemoryOrderRepository.save(order)

    await waitFor(() => {
      expect(sendoNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
