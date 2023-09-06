import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Product,
  ProductProps,
} from '@/domain/stock-management/enterprise/product'
import { Stock } from '@/domain/stock-management/enterprise/stock'

export function MakeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID,
) {
  const productId = id ?? new UniqueEntityID()
  const NewProduct = Product.create(
    {
      name: faker.commerce.productName(),
      managerId: new UniqueEntityID(),
      stock: Stock.create({
        productId,
        current: 1000,
        minimun: 100,
      }),
      colorProduct: faker.color.human(),
      sizeProduct: faker.string.numeric(),
      ...override,
    },
    productId,
  )

  return NewProduct
}
