import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { DeleteRecipientUseCase } from './delete-recipient'
import { MakeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let deletRecipientUseCase: DeleteRecipientUseCase

describe('Delete recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    deletRecipientUseCase = new DeleteRecipientUseCase(
      inMemoryRecipientRepository,
    )
  })

  it('should be able to delete a recipient', async () => {
    const recipient = MakeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const result = await deletRecipientUseCase.execute({
      recipientId: recipient.id.toString(),
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryRecipientRepository.items).toHaveLength(0)
  })
})
