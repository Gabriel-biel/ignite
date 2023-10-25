import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { RegisterRecipientUseCase } from './register-recipient'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let registerRecipientUseCase: RegisterRecipientUseCase

describe('Register recipient use case', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository(
      inMemoryAddressRepository,
    )
    registerRecipientUseCase = new RegisterRecipientUseCase(
      inMemoryRecipientRepository,
    )
  })

  it('should be able to register a recipient', async () => {
    const result = await registerRecipientUseCase.execute({
      name: 'Gabriel',
      email: 'gabriel97ga98@gmail.com',
      cpf: '123456',
      address: {
        city: 'Lábre',
        street: 'Rua 1',
        house_number: 1234,
        latitude: 1,
        longitude: 2,
      },
    })

    console.log(result.value?.recipient.address)

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      recipient: expect.objectContaining({
        name: 'Gabriel',
        cpf: '123456',
      }),
    })
  })
})
