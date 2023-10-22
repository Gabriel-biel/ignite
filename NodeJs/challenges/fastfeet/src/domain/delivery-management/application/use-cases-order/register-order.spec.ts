import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { RegisterOrderUseCase } from './register-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'

let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let registerOrderUseCase: RegisterOrderUseCase

describe('Register order use case', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
    )
    registerOrderUseCase = new RegisterOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to register order', async () => {
    const result = await registerOrderUseCase.execute({
      recipientId: '123',
    })

    expect(result.isRigth()).toBe(true)
    expect(result.value).toEqual({
      order: inMemoryOrderRepository.items[0],
    })
  })
})
