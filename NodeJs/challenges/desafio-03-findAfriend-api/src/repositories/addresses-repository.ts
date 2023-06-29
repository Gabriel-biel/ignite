export interface CreatedAddress {
  city: string
  street: string
  phone: string
  org_id: string
}

export interface Address {
  id: string
  city: string
  street: string
  phone: string
  org_id: string
}

export interface AddressesRepository {
  create(data: CreatedAddress): Promise<Address>
  findById(id: string): Promise<Address | null>
}
