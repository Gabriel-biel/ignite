import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'

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
    console.log(userId)

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
