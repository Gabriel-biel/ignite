import { Controller, Post, HttpCode, Body, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/register-account'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
  role: z.enum(['DELIVERYMAN', 'RECIPIENT', 'ADM']).optional(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class RegisterAccountController {
  constructor(private registerAccount: RegisterAccountUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, cpf, password, role } = body

    await this.registerAccount.execute({
      name,
      email,
      cpf,
      password,
      role,
    })
  }
}
