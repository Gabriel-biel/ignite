import { AccountRepository } from '@/domain/delivery-management/application/repositories/account-repository'
import { Account } from '@/domain/delivery-management/enterprise/entities/account'
import { Injectable } from '@nestjs/common'
import { PrismaAccountMapper } from '../mappers/prisma-account-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async create(account: Account) {
    const data = PrismaAccountMapper.toPrisma(account)
    await this.prisma.user.create({ data })
  }

  async findById(accountId: string) {
    const account = await this.prisma.user.findUnique({
      where: {
        id: accountId,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountMapper.toDomain(account)
  }

  async findByCpf(cpf: string) {
    const account = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountMapper.toDomain(account)
  }

  async delete(account: Account) {
    await this.prisma.user.delete({
      where: {
        id: account.id.toString(),
      },
    })
  }

  async save(account: Account) {
    const data = PrismaAccountMapper.toPrisma(account)
    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
