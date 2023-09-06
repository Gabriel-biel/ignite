import { Product } from '@/domain/stock-management/enterprise/product'
import { ProductsRepository } from '@/domain/stock-management/application/repositories/products-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { StocksRepository } from '@/domain/stock-management/application/repositories/stocks-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  constructor(private stocksRepository: StocksRepository) {}

  async create(product: Product): Promise<void> {
    this.items.push(product)

    this.stocksRepository.create(product.stock)
  }

  async findById(productId: string) {
    const product = this.items.find((item) => item.id.toString() === productId)
    if (!product) {
      return null
    }

    return product
  }

  async findByIds(productsIds: string[]) {
    const products = []

    for (const productId of productsIds) {
      const product = this.items.find(
        (product) => product.id.toString() === productId,
      )

      if (product) {
        const stock = await this.stocksRepository.findByProductId(productId)

        if (stock) {
          product.stock = stock
        }

        products.push(product)
      }
    }

    return products
  }

  async findManyByQuery(params: PaginationParams, size: string, color: string) {
    let products: Product[] = []

    if (color) {
      products = this.items.filter((item) => item.colorProduct === color)
    }

    if (size) {
      products = this.items.filter((item) => item.sizeProduct === size)
    }

    if (!color && !size) {
      return this.items
    }

    products = products.slice((params.page - 1) * 20, params.page * 20)

    // const products = this.items
    //   .filter((item) => item.colorProduct === color)
    //   .filter((item) => item.sizeProduct === size)
    //   .slice((params.page - 1) * 20, params.page * 20)

    return products
  }

  async delete(product: Product) {
    const productIndex = this.items.findIndex((item) => item.id === product.id)

    this.items.splice(productIndex, 1)

    this.stocksRepository.deleteManyById(product.stock.id.toString())
  }

  async saveMany(products: Product[]): Promise<void> {
    for (const product of products) {
      const productIndex = this.items.findIndex(
        (item) => item.id === product.id,
      )

      this.items[productIndex] = product
    }
  }

  async save(product: Product) {
    const productIndex = this.items.findIndex((item) => item.id === product.id)

    this.items[productIndex] = product
  }
}
