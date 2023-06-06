import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'
import { DataBaseInMemory } from './database-in-memory'

export class InMemoryUsersRepository implements UsersRepository {
  constructor(private inMemoryDatabase: DataBaseInMemory) {}

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: data.role ?? 'MEMBER',
    }

    this.inMemoryDatabase.users.push(user)
    return user
  }

  async findById(id: string) {
    const user = this.inMemoryDatabase.users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.inMemoryDatabase.users.find(
      (item) => item.email === email,
    )

    if (!user) {
      return null
    }

    return user
  }
}
