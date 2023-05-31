import { Address, Org, Pet, User } from '@prisma/client'

export interface DatabaseInMemory {
  Addresses: Address[]
  Org: Org[]
  Pets: Pet[]
  Users: User[]
}
