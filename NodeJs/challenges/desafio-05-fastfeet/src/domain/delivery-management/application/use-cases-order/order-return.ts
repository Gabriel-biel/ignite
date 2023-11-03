import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export interface OrderReturnRequest {
  orderId: string
  recipientId: string
  returnAt: Date
}

export type OrderReturnResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

export class OrderReturnUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    recipientId,
    returnAt,
  }: OrderReturnRequest): Promise<OrderReturnResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    order.returned_at = returnAt

    await this.orderRepository.save(order)

    return right({ order })
  }
}
