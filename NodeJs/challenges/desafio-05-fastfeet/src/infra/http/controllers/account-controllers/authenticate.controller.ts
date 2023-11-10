import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AuthenticateAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/authenticate-account'
import { WrongCredentialsError } from '@/domain/delivery-management/application/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/Public'

const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

const validationPipe = new ZodValidationPipe(authenticateBodySchema)

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateAccount: AuthenticateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validationPipe) body: AuthenticateBodySchema) {
    const { cpf, password } = body

    const result = await this.authenticateAccount.execute({
      cpf,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
