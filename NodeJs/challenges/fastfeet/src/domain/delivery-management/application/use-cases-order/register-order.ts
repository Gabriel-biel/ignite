import { Either, rigth } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RegisterOrderUseCaseRequest {
  recipientId: string
  deliverymanId?: string
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
    deliverymanId,
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      deliverymanId: new UniqueEntityID(deliverymanId),
    })

    await this.orderRepository.create(order)

    return rigth({ order })
  }
}
