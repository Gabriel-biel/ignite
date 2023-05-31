import { Address } from '@prisma/client'

export interface AddressCreateInput {
  city: string
  phone: string
  street: string
  org_id: string
}

export interface AddressesRepository {
  create(data: AddressCreateInput): Promise<Address>
  findById(id: string): Promise<Address | null>
}
