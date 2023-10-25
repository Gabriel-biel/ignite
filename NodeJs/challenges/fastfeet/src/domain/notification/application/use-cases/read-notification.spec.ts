import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import { MakeNotification } from 'test/factories/make-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let readNotificationUseCase: ReadNotificationUseCase

describe('Read notification event test', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    readNotificationUseCase = new ReadNotificationUseCase(
      inMemoryNotificationsRepository,
    )
  })

  it('should be able to read a notification', async () => {
    const notification = MakeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await readNotificationUseCase.execute({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })
})
