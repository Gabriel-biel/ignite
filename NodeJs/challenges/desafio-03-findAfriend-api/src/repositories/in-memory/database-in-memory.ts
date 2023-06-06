import { Address, Org, Pet, User } from '@prisma/client'
// import { IOrg } from '../orgs-repository'

export class DataBaseInMemory {
  constructor(
    public users: User[] = [],
    public orgs: Org[] = [],
    public pets: Pet[] = [],
    public addresses: Address[] = [],
  ) {}
}
