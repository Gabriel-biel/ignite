import { Either, rigth } from '@/core/either'
import { Order } from '../../enterprise/entity/order'
import { OrderAlreadyExists } from '../errors/order-already-exists'
import { OrderRepository } from '../repositories/order-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RegisterOrderUseCaseRequest {
  recipientId: string
}

export type RegisterOrderUseCaseResponse = Either<
  OrderAlreadyExists,
  {
    order: Order
  }
>

export class RegisterOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    recipientId,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
    })

    await this.orderRepository.create(order)

    return rigth({ order })
  }
}
