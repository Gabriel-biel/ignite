import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { ChooseNameRecipientUseCase } from './choose-name-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let chooseNameRecipientUseCase: ChooseNameRecipientUseCase

describe('Edit recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    chooseNameRecipientUseCase = new ChooseNameRecipientUseCase(
      inMemoryRecipientRepository,
    )
  })

  it('should be able to edit a recipient', async () => {
    const recipient = MakeRecipient()

    await inMemoryRecipientRepository.create(recipient)

    const result = await chooseNameRecipientUseCase.execute({
      recipientId: recipient.id.toString(),
      name: 'Gabsgol',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        name: 'Gabsgol',
      }),
    })
  })
})
