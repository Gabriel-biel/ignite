import { Product } from '../../enterprise/product'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface ProductsRepository {
  create(produtc: Product): Promise<void>
  findById(productId: string): Promise<Product | null>
  findByIds(productsIds: string[]): Promise<Product[]>
  findManyByQuery(
    params: PaginationParams,
    size?: string,
    color?: string,
  ): Promise<Product[]>
  delete(product: Product): Promise<void>
  saveMany(products: Product[]): Promise<void>
  save(product: Product): Promise<void>
}
