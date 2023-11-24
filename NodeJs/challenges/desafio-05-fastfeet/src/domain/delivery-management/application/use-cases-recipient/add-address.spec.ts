import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { AddAddressUseCase } from './add-address'

let inMemoryAddressRepository: InMemoryAddressRepository
let addAddress: AddAddressUseCase

describe('Add address use case', () => {
  beforeEach(() => {
    inMemoryAddressRepository = new InMemoryAddressRepository()
    addAddress = new AddAddressUseCase(inMemoryAddressRepository)
  })

  it('should be able to add address', async () => {
    const result = await addAddress.execute({
      city: 'Lábrea',
      houseNumber: '1234',
      street: '12345',
      recipientId: 'recipient-id',
      latitude: 1234,
      longitude: 1234567,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAddressRepository.items).toHaveLength(1)
    expect(result.value).toEqual({
      address: expect.objectContaining({ city: 'Lábrea' }),
    })
  })
})
