import { MakeOrder } from 'test/factories/make-order'
import { OnPickupOrder } from './on-pickup-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SpyInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'

let inMemoryOrderAttachments: InMemoryOrderAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('on pickup order', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderAttachments = new InMemoryOrderAttachmentsRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachments,
    )
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnPickupOrder(inMemoryRecipientRepository, sendNotificationUseCase)
  })
  it('should send a notification when an order is picked', async () => {
    // cria o subscribe / começa a ouvir o evento

    const recipient = MakeRecipient(
      {},
      new UniqueEntityID('recipient-for-test-notification'),
    )
    inMemoryRecipientRepository.create(recipient)

    const order = MakeOrder({
      recipientId: recipient.id,
    })
    inMemoryOrderRepository.create(order)

    order.pickup_at = new Date()
    // nesse momento o metodo dentro o OnPickupOrder e ativado e faz o envio da notificação
    inMemoryOrderRepository.save(order)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
