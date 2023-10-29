import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createOrderBodySchema = z.object({
  recipientId: z.string(),
  pickupAvailableOrder: z.coerce.date().optional(),
  pickupAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  returnedAt: z.date().optional(),
})

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

const validationPipe = new ZodValidationPipe(createOrderBodySchema)

@Controller('/orders')
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(validationPipe) body: CreateOrderBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub
    console.log(`orderId= ${userId}`)

    const {
      recipientId,
      pickupAvailableOrder,
      pickupAt,
      deliveredAt,
      returnedAt,
    } = body

    await this.prisma.order.create({
      data: {
        recipientId,
        pickupAvailableOrder,
        pickupAt,
        deliveredAt,
        returnedAt,
      },
    })
  }
}
