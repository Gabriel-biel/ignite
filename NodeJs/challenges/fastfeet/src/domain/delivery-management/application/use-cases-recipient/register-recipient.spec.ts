import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { RegisterRecipientUseCase } from './register-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let registerRecipientUseCase: RegisterRecipientUseCase

describe('Register recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    registerRecipientUseCase = new RegisterRecipientUseCase(
      inMemoryRecipientRepository,
    )
  })

  it('should be able to register a recipient', async () => {
    const result = await registerRecipientUseCase.execute({
      name: 'Gabriel',
      email: 'gabriel97ga98@gmail.com',
      cpf: '123456',
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toEqual({
      recipient: expect.objectContaining({
        name: 'Gabriel',
        cpf: '123456',
      }),
    })
  })
})
