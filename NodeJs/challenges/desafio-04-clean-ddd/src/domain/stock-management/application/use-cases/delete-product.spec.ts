import { MakeProduct } from 'test/factories/make-product'
import { DeleteProductUseCase } from './delete-product'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed'
import { InMemoryStocksRepository } from 'test/repositories/in-memory-stocks-repository'

let inMemoryStocksRepository: InMemoryStocksRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: DeleteProductUseCase

describe('Delete a product', () => {
  beforeEach(() => {
    inMemoryStocksRepository = new InMemoryStocksRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryStocksRepository,
    )
    sut = new DeleteProductUseCase(inMemoryProductsRepository)
  })
  it('should be able to delete a especific product', async () => {
    const NewProduct = MakeProduct()

    await inMemoryProductsRepository.create(NewProduct)

    await sut.execute({
      managerId: NewProduct.managerId.toString(),
      productId: NewProduct.id.toString(),
    })

    expect(inMemoryProductsRepository.items).toHaveLength(0)
    expect(inMemoryStocksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a product from another manager', async () => {
    const NewProduct = MakeProduct({
      managerId: new UniqueEntityID('Manager Vinnie'),
    })

    await inMemoryProductsRepository.create(NewProduct)

    const result = await sut.execute({
      productId: NewProduct.id.toString(),
      managerId: 'Gabriel manager',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
