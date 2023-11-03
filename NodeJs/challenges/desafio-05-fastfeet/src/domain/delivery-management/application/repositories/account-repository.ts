import { Account } from '../../enterprise/entities/account'

export abstract class AccountRepository {
  abstract create(account: Account): Promise<void>
  abstract findById(accountId: string): Promise<Account | null>
  abstract findByCpf(cpf: string): Promise<Account | null>
  abstract delete(account: Account): Promise<void>
  abstract save(account: Account): Promise<void>
}
