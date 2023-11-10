import { Either, left, right } from '@/core/either'
import { AddressRepository } from '../repositories/address-repository'
import { Address } from '../../enterprise/entities/address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AddressAlreadyExists } from '../errors/address-already-exists'
import { Injectable } from '@nestjs/common'

export interface AddAddressUseCaseRequest {
  recipientId: string
  city: string
  street: string
  houseNumber: string
  latitude: number
  longitude: number
}

export type AddAddressUseCaseResponse = Either<
  AddressAlreadyExists,
  {
    address: Address
  }
>

@Injectable()
export class AddAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    recipientId,
    city,
    street,
    houseNumber,
    latitude,
    longitude,
  }: AddAddressUseCaseRequest): Promise<AddAddressUseCaseResponse> {
    const addressExists =
      await this.addressRepository.findByRecipientId(recipientId)

    const addressAlreadyExits = addressExists.find(
      (item) =>
        item.house_number === houseNumber &&
        item.street === street &&
        item.city === city,
    )

    if (addressAlreadyExits) {
      return left(new AddressAlreadyExists())
    }

    const address = Address.create({
      recipientId: new UniqueEntityID(recipientId),
      city,
      street,
      house_number: houseNumber,
      latitude,
      longitude,
    })

    await this.addressRepository.create(address)

    return right({ address })
  }
}
