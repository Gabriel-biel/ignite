import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/delivery-management/enterprise/entities/account'
import { User as PrismaAccount, Prisma } from '@prisma/client'

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        password: raw.password!, // test
        role: raw.role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(account: Account): Prisma.UserUncheckedCreateInput {
    return {
      id: account.id.toString(),
      name: account.name,
      email: account.email,
      cpf: account.cpf,
      password: account.password,
      role: account.role,
    }
  }
}
