import { InMemoryStocksRepository } from 'test/repositories/in-memory-stocks-repository'
import { CreateProductUseCase } from './create-product'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'

let inMemoryStocksRepository: InMemoryStocksRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create a product', () => {
  beforeEach(() => {
    inMemoryStocksRepository = new InMemoryStocksRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryStocksRepository,
    )
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })
  it('should be able to create a new product', async () => {
    const result = await sut.execute({
      name: 'Arroz',
      managerId: 'manager gabriel',
      current: 2,
      minimun: 2,
      sizeProduct: '1kg',
      colorProduct: 'Branco',
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryProductsRepository.items[0]).toEqual(result.value?.product)
    expect(inMemoryStocksRepository.items[0].current).toEqual(2)
    expect(inMemoryStocksRepository.items[0].minimun).toEqual(2)
  })
})
