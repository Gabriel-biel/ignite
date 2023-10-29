import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RegisterOrderUseCaseRequest {
  recipientId: string
  addressId: string
}

export type RegisterOrderUseCaseResponse = Either<
  null,
  {
    order: Order
  }
>

export class RegisterOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    recipientId,
    addressId,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      addressId: new UniqueEntityID(addressId),
    })

    await this.orderRepository.create(order)

    return right({ order })
  }
}
