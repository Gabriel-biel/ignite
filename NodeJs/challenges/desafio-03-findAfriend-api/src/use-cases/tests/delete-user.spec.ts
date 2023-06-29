import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteUserUseCase } from '../delete-user'
import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'

let inMemoryDatabase: DatabaseInMemory
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete user test use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryUsersRepository = new InMemoryUsersRepository(inMemoryDatabase)
    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })
  it('Should be able to delete user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhonDoe@gamail.com',
      password_hash: '123456',
    })

    await sut.execute({ userId: user.id })

    const userExists = await inMemoryUsersRepository.findById(user.id)

    expect(userExists).toEqual(null)
  })
})
