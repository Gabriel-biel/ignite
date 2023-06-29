import { Address } from '../addresses-repository'
import { Org } from '../orgs-repository'
import { Pet } from '../pets-repository'
import { User } from '../users-repository'

export class DatabaseInMemory {
  constructor(
    public users: User[] = [],
    public orgs: Org[] = [],
    public pets: Pet[] = [],
    public address: Address[] = [],
  ) {}
}
