import {
  Controller,
  Post,
  HttpCode,
  Body,
  ConflictException,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/register-account'
import { AccountAlreadyExists } from '@/domain/delivery-management/application/errors/account-already-exists'
import { Public } from '@/infra/auth/Public'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
  role: z.enum(['DELIVERYMAN', 'RECIPIENT', 'ADM']).optional(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

const validationPipe = new ZodValidationPipe(createAccountBodySchema)

@Controller('/accounts')
@Public()
export class RegisterAccountController {
  constructor(private registerAccount: RegisterAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationPipe) body: CreateAccountBodySchema) {
    const { name, email, cpf, password, role } = body

    const result = await this.registerAccount.execute({
      name,
      email,
      cpf,
      password,
      role,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AccountAlreadyExists:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
