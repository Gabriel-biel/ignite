import {
  Controller,
  Post,
  HttpCode,
  Body,
  ConflictException,
  UseGuards,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

const createRecipientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  role: z.enum(['DELIVERYMAN', 'RECIPIENT', 'ADM']),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

const validationPipe = new ZodValidationPipe(createRecipientBodySchema)

@Controller('/accounts/recipients')
export class CreateRecipientController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async handle(@Body(validationPipe) body: CreateRecipientBodySchema) {
    const { name, email, cpf, role } = body

    const userWithEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithEmail) {
      throw new ConflictException('user whit same email addres already exists')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        cpf,
        role,
      },
    })
  }
}
