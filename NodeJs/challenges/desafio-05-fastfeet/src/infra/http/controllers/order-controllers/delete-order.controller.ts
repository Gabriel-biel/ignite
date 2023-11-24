import { DeleteOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/delete-order'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const deleteOrderQuerySchema = z.string()

type DeleteOrderQuerySchema = z.infer<typeof deleteOrderQuerySchema>

const validationPipe = new ZodValidationPipe(deleteOrderQuerySchema)

@Controller('/orders/delete')
export class DeleteOrderController {
  constructor(private deleteOrder: DeleteOrderUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Query('orderId', validationPipe) orderId: DeleteOrderQuerySchema,
  ) {
    const result = await this.deleteOrder.execute({ orderId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }
  }
}
