import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { RegisterOrderUseCase } from './register-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let registerOrderUseCase: RegisterOrderUseCase

describe('Register order use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryRecipientRepository,
      inMemoryAddressRepository,
    )
    registerOrderUseCase = new RegisterOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to register order', async () => {
    const result = await registerOrderUseCase.execute({
      recipientId: '123',
      addressId: '1234s',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      order: inMemoryOrderRepository.items[0],
    })
  })
})
