import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { RegisterOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/register-order'

const createOrderBodySchema = z.object({
  recipientId: z.string(),
  addressId: z.string(),
})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

const validationPipe = new ZodValidationPipe(createOrderBodySchema)

@Controller('/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor(private createOrder: RegisterOrderUseCase) {}

  @Post()
  async handle(@Body(validationPipe) body: CreateOrderBodySchema) {
    const { recipientId, addressId } = body

    await this.createOrder.execute({
      recipientId,
      addressId,
    })
  }
}
