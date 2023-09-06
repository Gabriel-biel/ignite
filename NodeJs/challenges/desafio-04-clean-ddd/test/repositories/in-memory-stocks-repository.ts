import { StocksRepository } from '@/domain/stock-management/application/repositories/stocks-repository'
import { Stock } from '@/domain/stock-management/enterprise/stock'

export class InMemoryStocksRepository implements StocksRepository {
  public items: Stock[] = []

  async create(stock: Stock) {
    this.items.push(stock)
  }

  async findById(stockId: string) {
    const productStock = this.items.filter(
      (item) => item.id.toString() === stockId,
    )

    return productStock
  }

  async findByProductId(productId: string) {
    const stock = this.items.find(
      (item) => item.productId.toString() === productId,
    )

    if (!stock) {
      return null
    }

    return stock
  }

  async deleteManyById(stockId: string) {
    const productStocks = this.items.filter(
      (item) => item.id.toString() !== stockId,
    )

    this.items = productStocks
  }
}
