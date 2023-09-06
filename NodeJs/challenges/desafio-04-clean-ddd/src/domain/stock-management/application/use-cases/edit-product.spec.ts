import { MakeProduct } from 'test/factories/make-product'
import { EditProductUseCase } from './edit-product'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStocksRepository } from 'test/repositories/in-memory-stocks-repository'

let inMemoryStocksRepository: InMemoryStocksRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: EditProductUseCase

describe('Edit a product', () => {
  beforeEach(() => {
    inMemoryStocksRepository = new InMemoryStocksRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryStocksRepository,
    )
    sut = new EditProductUseCase(inMemoryProductsRepository)
  })
  it('should be able to edit a new product', async () => {
    const product = MakeProduct({
      managerId: new UniqueEntityID('manager gabriel'),
    })

    await inMemoryProductsRepository.create(product)

    const result = await sut.execute({
      managerId: 'manager gabriel',
      productId: product.id.toString(),
      current: 400,
      minimun: 200,
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryProductsRepository.items[0].stock.current).toEqual(400)
    expect(inMemoryProductsRepository.items[0].stock.minimun).toEqual(200)
    expect(inMemoryProductsRepository.items[0].managerId.toString()).toEqual(
      'manager gabriel',
    )
  })
})
