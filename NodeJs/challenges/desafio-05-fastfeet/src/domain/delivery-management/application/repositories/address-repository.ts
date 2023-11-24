import { Address } from '../../enterprise/entities/address'

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>
  abstract findById(addressId: string): Promise<Address | null>
  abstract findByRecipientId(recipientId: string): Promise<Address[]>
}
