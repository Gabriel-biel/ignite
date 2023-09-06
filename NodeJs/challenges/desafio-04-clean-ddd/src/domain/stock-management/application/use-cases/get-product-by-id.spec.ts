import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { GetProductByIdUseCase } from './get-product-by-id'
import { MakeProduct } from 'test/factories/make-product'
import { InMemoryStocksRepository } from 'test/repositories/in-memory-stocks-repository'

let inMemoryStocksRepository: InMemoryStocksRepository
let inMemoryProductsRepository: InMemoryProductsRepository
let sut: GetProductByIdUseCase

describe('Get product by id', () => {
  beforeEach(() => {
    inMemoryStocksRepository = new InMemoryStocksRepository()
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryStocksRepository,
    )
    sut = new GetProductByIdUseCase(inMemoryProductsRepository)
  })
  it('should be able to get a specific product by id', async () => {
    const NewProduct = MakeProduct()

    await inMemoryProductsRepository.create(NewProduct)

    const result = await sut.execute({
      productId: NewProduct.id.toString(),
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toMatchObject({ product: NewProduct })
  })
})
