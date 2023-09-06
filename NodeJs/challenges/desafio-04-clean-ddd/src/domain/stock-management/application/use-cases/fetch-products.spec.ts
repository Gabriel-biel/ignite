import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { MakeProduct } from 'test/factories/make-product'
import { FetchProductUseCase } from './fetch-products'
import { InMemoryStocksRepository } from 'test/repositories/in-memory-stocks-repository'

let inMemoryStocksRepository: InMemoryStocksRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: FetchProductUseCase

describe('Fetch product', () => {
  beforeEach(() => {
    inMemoryStocksRepository = new InMemoryStocksRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryStocksRepository,
    )
    sut = new FetchProductUseCase(inMemoryProductsRepository)
  })
  it('should be able to fetch products by size', async () => {
    await inMemoryProductsRepository.create(
      MakeProduct({
        colorProduct: 'Azul',
        sizeProduct: '1',
      }),
    )
    await inMemoryProductsRepository.create(
      MakeProduct({
        colorProduct: 'Azul',
        sizeProduct: '1',
      }),
    )
    await inMemoryProductsRepository.create(
      MakeProduct({
        colorProduct: 'Azul',
        sizeProduct: '2',
      }),
    )

    const result = await sut.execute({
      page: 1,
      sizeProduct: '1',
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toMatchObject({
      products: [
        expect.objectContaining({ sizeProduct: '1' }),
        expect.objectContaining({ sizeProduct: '1' }),
      ],
    })
  })
})
