import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { GetAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/get-account'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AccountPresenter } from '../../presenters/account-presenter'

@Controller('/account/profile')
export class GetAccountController {
  constructor(private getAccount: GetAccountUseCase) {}

  @HttpCode(200)
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const accountId = user.sub

    const result = await this.getAccount.execute({
      accountId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }

    const { account } = result.value

    return { account: AccountPresenter.toHTTP(account) }
  }
}
