import { randomUUID } from 'node:crypto'
import { CreatedUser, User, UsersRepository } from '../users-repository'
import { DatabaseInMemory } from './database-in-memory'

export class InMemoryUsersRepository implements UsersRepository {
  constructor(private inMemoryDatabase: DatabaseInMemory) {}
  async create(data: CreatedUser) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'Member',
      created_at: data.created_at ?? new Date(),
    }

    this.inMemoryDatabase.users.push(user)

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.inMemoryDatabase.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.inMemoryDatabase.users.find(
      (user) => user.email === email,
    )

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    this.inMemoryDatabase.users = this.inMemoryDatabase.users.filter(
      (user) => user.id !== id,
    )
  }
}
