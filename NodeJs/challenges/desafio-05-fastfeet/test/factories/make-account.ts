import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Account,
  AccountProps,
} from '@/domain/delivery-management/enterprise/entities/account'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaAccountMapper } from '@/infra/database/prisma/mappers/prisma-account-mapper'

export function MakeAccount(
  override: Partial<AccountProps> = {},
  id?: UniqueEntityID,
) {
  const account = Account.create(
    {
      name: faker.person.firstName(),
      cpf: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return account
}

@Injectable()
export class AccountFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAccount(data: Partial<AccountProps> = {}): Promise<Account> {
    const account = MakeAccount(data)

    await this.prisma.user.create({
      data: PrismaAccountMapper.toPrisma(account),
    })

    return account
  }
}
