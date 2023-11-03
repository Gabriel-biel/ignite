import { AccountRepository } from '@/domain/delivery-management/application/repositories/account-repository'
import { Account } from '@/domain/delivery-management/enterprise/entities/account'

export class InMemoryAccountsRepository implements AccountRepository {
  public items: Account[] = []

  async create(account: Account) {
    this.items.push(account)
  }

  async findById(accountId: string) {
    const account = this.items.find((item) => item.id.toString() === accountId)

    if (!account) {
      return null
    }

    return account
  }

  async findByCpf(cpf: string) {
    const account = this.items.find((item) => item.cpf === cpf)

    if (!account) {
      return null
    }

    return account
  }

  async delete(account: Account) {
    const item = this.items.findIndex((item) => item.id === account.id)

    this.items.splice(item, 1)
  }

  async save(account: Account) {
    const item = this.items.findIndex((item) => item.id === account.id)

    this.items[item] = account
  }
}
