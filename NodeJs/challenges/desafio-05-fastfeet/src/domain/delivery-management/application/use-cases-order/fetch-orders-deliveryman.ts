import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export interface FetchOrdersAccountUseCaseRequest {
  page: number
  accountId: string
}

export type FetchOrdersAccountUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

export class FetchOrdersAccountUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
    accountId,
  }: FetchOrdersAccountUseCaseRequest): Promise<FetchOrdersAccountUseCaseResponse> {
    const order = await this.orderRepository.findManyByOrdersAccount(
      { page },
      accountId,
    )

    return right({ order })
  }
}
