import { AddressAlreadyExists } from '@/domain/delivery-management/application/errors/address-already-exists'
import { AddAddressUseCase } from '@/domain/delivery-management/application/use-cases-recipient/add-address'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createAddressBodySchema = z.object({
  recipientId: z.string(),
  city: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

type CreateAddressBodySchema = z.infer<typeof createAddressBodySchema>

const validadionPipe = new ZodValidationPipe(createAddressBodySchema)

@Controller('/recipients/addresses')
export class CreateAddressRecipientController {
  constructor(private addAddress: AddAddressUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(validadionPipe) body: CreateAddressBodySchema) {
    const { recipientId, city, street, houseNumber, latitude, longitude } = body

    const result = await this.addAddress.execute({
      recipientId,
      city,
      street,
      houseNumber,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AddressAlreadyExists:
          throw new AddressAlreadyExists()
        default:
          console.log(error.message)
          throw new BadRequestException()
      }
    }

    // return { addressId: result.value.address.id }
  }
}
