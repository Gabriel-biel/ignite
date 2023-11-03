import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { RegisterRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/register-recipient'

const registerRecipientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
})

type RegisterRecipientBodySchema = z.infer<typeof registerRecipientBodySchema>

const validationPipe = new ZodValidationPipe(registerRecipientBodySchema)

@Controller('/accounts/recipients')
export class RegisterRecipientController {
  constructor(private registerRecipient: RegisterRecipientUseCase) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async handle(@Body(validationPipe) body: RegisterRecipientBodySchema) {
    const { name, email, cpf } = body

    const result = await this.registerRecipient.execute({
      name,
      email,
      cpf,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { recipientId: result.value?.recipient.id } // test
  }
}
