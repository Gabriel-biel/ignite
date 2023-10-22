import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { EditRecipientUseCase } from './edit-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let editRecipientUseCase: EditRecipientUseCase

describe('Edit recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    editRecipientUseCase = new EditRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to edit a recipient', async () => {
    const recipient = MakeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const result = await editRecipientUseCase.execute({
      recipientId: recipient.id.toString(),
      name: 'gabriel',
      email: 'gabriel123@gmail.com',
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        name: 'gabriel',
        email: 'gabriel123@gmail.com',
      }),
    })
  })
})
