import { Controller, Get, Query, BadRequestException } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchOrdersRecipientUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-recipient'
import { OrderPresenter } from '../../presenters/order-presenter'

const pageQueryParamSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  recipientId: z.string(),
})

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/orders/recipient')
export class FetchOrdersRecipientController {
  constructor(private fetchOrdersByAccount: FetchOrdersRecipientUseCase) {}

  @Get()
  async handle(
    @Query(queryValidationPipe)
    { page, recipientId }: PageQueryParamSchema,
  ) {
    const result = await this.fetchOrdersByAccount.execute({
      page,
      recipientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const orders = result.value.order

    return {
      orders: orders.map(OrderPresenter.toHTTP),
    }
  }
}
