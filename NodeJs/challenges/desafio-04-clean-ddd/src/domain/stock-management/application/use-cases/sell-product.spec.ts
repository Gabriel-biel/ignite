import { MakeProduct } from 'test/factories/make-product'
import { SellProductUseCase } from './sell-product'
import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { InMemoryStocksRepository } from 'test/repositories/in-memory-stocks-repository'

let inMemoryStocksRepository: InMemoryStocksRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: SellProductUseCase

describe('Sell a product', () => {
  beforeEach(() => {
    inMemoryStocksRepository = new InMemoryStocksRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryStocksRepository,
    )
    sut = new SellProductUseCase(inMemoryProductsRepository)
  })
  it('should be able to sell a product', async () => {
    const product01 = MakeProduct({
      name: 'Macarrão',
    })
    inMemoryStocksRepository.items.push(product01.stock)
    inMemoryProductsRepository.items.push(product01)

    const product02 = MakeProduct({
      name: 'Arroz',
    })
    inMemoryStocksRepository.items.push(product02.stock)
    inMemoryProductsRepository.items.push(product02)

    const result = await sut.execute({
      products: [
        { id: product01.id.toString(), amount: 4 },
        { id: product02.id.toString(), amount: 2 },
        { id: '1', amount: 2 },
      ],
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryStocksRepository.items[0].current).toBe(996)
    expect(inMemoryStocksRepository.items[1].current).toBe(998)
  })
})
