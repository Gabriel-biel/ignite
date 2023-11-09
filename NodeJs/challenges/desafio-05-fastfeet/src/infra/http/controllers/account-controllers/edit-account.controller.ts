import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AccountPresenter } from '../../presenters/account-presenter'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/edit-account'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

const updateAccountBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

type UpdateAccountBodySchema = z.infer<typeof updateAccountBodySchema>

const validationPipe = new ZodValidationPipe(updateAccountBodySchema)

@Controller('/account/profile')
export class EditAccountController {
  constructor(private editAccount: EditAccountUseCase) {}

  @HttpCode(200)
  @Patch()
  async handle(
    @Body(validationPipe) body: UpdateAccountBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const accountId = user.sub
    const { email, name, password } = body

    const result = await this.editAccount.execute({
      accountId,
      email,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        case NotAllowedError:
          throw new UnauthorizedException()
        default:
          throw new BadRequestException()
      }
    }

    const { account } = result.value

    return { account: AccountPresenter.toHTTP(account) }
  }
}
