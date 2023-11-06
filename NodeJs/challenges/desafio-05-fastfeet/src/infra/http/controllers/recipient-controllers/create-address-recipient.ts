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

const createAddressBodySchema = z.object({
  city: z.string(),
  street: z.string(),
  recipientId: z.string(),
  houseNumber: z.string(),
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

type CreateAddressBodySchema = z.infer<typeof createAddressBodySchema>

@Controller('accounts/recipients/addresses')
export class CreateAddressRecipientController {
  constructor(private addAddress: AddAddressUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAddressBodySchema) {
    const { city, houseNumber, street, recipientId, latitude, longitude } = body

    const result = await this.addAddress.execute({
      city,
      street,
      houseNumber,
      recipientId,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AddressAlreadyExists:
          throw new AddressAlreadyExists()
        default:
          throw new BadRequestException()
      }
    }
  }
}
