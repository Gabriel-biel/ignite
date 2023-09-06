import { Stock } from '../../enterprise/stock'

export interface StocksRepository {
  create(stock: Stock): Promise<void>
  findById(stockId: string): Promise<Stock[]>
  findByProductId(productId: string): Promise<Stock | null>
  deleteManyById(stockId: string): Promise<void>
}
