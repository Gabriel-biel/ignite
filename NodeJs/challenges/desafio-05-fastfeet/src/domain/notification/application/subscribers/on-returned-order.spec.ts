import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { waitFor } from 'test/utils/wait-for'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { MakeOrder } from 'test/factories/make-order'
import { SpyInstance } from 'vitest'
import { OnReturnedOrder } from './on-returned-order'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On returned order', () => {
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
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnReturnedOrder(inMemoryRecipientRepository, sendNotificationUseCase)
  })

  it('should a send notification when a order was returned', async () => {
    const recipient = MakeRecipient(
      {},
      new UniqueEntityID('recipient-id-for-test'),
    )
    const order = MakeOrder({ recipientId: recipient.id })

    inMemoryRecipientRepository.create(recipient)
    inMemoryOrderRepository.create(order)

    order.returned_at = new Date()

    inMemoryOrderRepository.save(order)

    await waitFor(() => {
      expect(sendNotificationSpy).toHaveBeenCalled()
    })
  })
})
