import { DeleteAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/delete-account'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const deleteAccountQuerySchema = z.string()

type DeleteAccountQuerySchema = z.infer<typeof deleteAccountQuerySchema>

const validationPipe = new ZodValidationPipe(deleteAccountQuerySchema)

@Controller('/account/profile')
export class DeleteAccountController {
  constructor(private deleteAccount: DeleteAccountUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Query('accountId', validationPipe) accountId: DeleteAccountQuerySchema,
  ) {
    const result = await this.deleteAccount.execute({
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
  }
}
