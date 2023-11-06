import { Either, left, right } from '@/core/either'
import { AddressRepository } from '../repositories/address-repository'
import { Address } from '../../enterprise/entities/address'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AddressAlreadyExists } from '../errors/address-already-exists'

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

export class AddAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    city,
    houseNumber,
    street,
    recipientId,
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
      city,
      house_number: houseNumber,
      street,
      recipientId: new UniqueEntityID(recipientId),
      latitude,
      longitude,
    })

    await this.addressRepository.create(address)

    return right({ address })
  }
}
