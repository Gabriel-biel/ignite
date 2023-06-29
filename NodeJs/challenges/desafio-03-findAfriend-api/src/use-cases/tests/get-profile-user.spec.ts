import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from '../get-profile-user'
import { hash } from 'bcryptjs'

let inMemoryDatabase: DatabaseInMemory
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile test use case', async () => {
  beforeEach(async () => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryUsersRepository = new InMemoryUsersRepository(inMemoryDatabase)
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(expect.objectContaining({ name: 'Gabriel' }))
  })
})
