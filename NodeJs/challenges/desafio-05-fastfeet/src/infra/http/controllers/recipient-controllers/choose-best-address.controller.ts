import {
  BadRequestException,
  Body,
  Controller,
  Put,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { ChooseBestAddressRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/choose-best-address-recipient'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { RecipientPresenter } from '../../presenters/recipient-presenter'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

const recipientParamsSchema = z.object({
  recipientId: z.string(),
})

const recipientBodySchema = z.object({
  addressId: z.string(),
})

type RecipientParamsSchema = z.infer<typeof recipientParamsSchema>
type RecipientBodySchema = z.infer<typeof recipientBodySchema>

const validationPipe = new ZodValidationPipe(recipientParamsSchema)
const bodyValidationPipe = new ZodValidationPipe(recipientBodySchema)

@Controller('/recipient/profile/bestAddress/:recipientId')
export class ChooseBestAddressController {
  constructor(private chooseBestAddress: ChooseBestAddressRecipientUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(validationPipe) { recipientId }: RecipientParamsSchema,
    @Body(bodyValidationPipe) { addressId }: RecipientBodySchema,
  ) {
    const result = await this.chooseBestAddress.execute({
      recipientId,
      addressId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        case NotAllowedError:
          throw new NotAllowedError()
        default:
          throw new BadRequestException()
      }
    }

    return { recipient: RecipientPresenter.toHTTP(result.value.recipient) }
  }
}
