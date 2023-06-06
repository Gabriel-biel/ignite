import { Address } from '@prisma/client'

export interface IAddress {
  city: string
  phone: string
  street: string
  org_id: string
}

export interface AddressesRepository {
  create(data: IAddress): Promise<Address>
  findById(id: string): Promise<Address | null>
}
