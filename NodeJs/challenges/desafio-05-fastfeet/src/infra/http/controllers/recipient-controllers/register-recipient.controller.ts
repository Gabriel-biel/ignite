import {
  Controller,
  Post,
  HttpCode,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/register-recipient'
import { AccountAlreadyExists } from '@/domain/delivery-management/application/errors/account-already-exists'

const registerRecipientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
})

type RegisterRecipientBodySchema = z.infer<typeof registerRecipientBodySchema>

const validationPipe = new ZodValidationPipe(registerRecipientBodySchema)

@Controller('/recipients')
export class RegisterRecipientController {
  constructor(private registerRecipient: RegisterRecipientUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationPipe) body: RegisterRecipientBodySchema) {
    const { name, email, cpf } = body

    const result = await this.registerRecipient.execute({
      name,
      email,
      cpf,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AccountAlreadyExists:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    return { recipientId: result.value?.recipient.id } // test
  }
}
