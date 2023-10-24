import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { GetRecipientUseCase } from './get-recipient'
import { MakeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let getRecipientUseCase: GetRecipientUseCase

describe('Get recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    getRecipientUseCase = new GetRecipientUseCase(inMemoryRecipientRepository)
  })

  it('should be able to get a recipient', async () => {
    const recipient = MakeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const result = await getRecipientUseCase.execute({
      recipientId: recipient.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      recipient: inMemoryRecipientRepository.items[0],
    })
  })
})
