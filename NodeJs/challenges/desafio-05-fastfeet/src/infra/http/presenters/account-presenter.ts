import { Account } from '@/domain/delivery-management/enterprise/entities/account'

export class AccountPresenter {
  static toHTTP(account: Account) {
    return {
      id: account.id.toString(),
      name: account.name,
      email: account.email,
      // password: account.password,
      role: account.role,
    }
  }
}
