import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'

let inMemoryDatabase: DataBaseInMemory
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryUsersRepository = new InMemoryUsersRepository(inMemoryDatabase)
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Gabriel biel',
      email: 'gabriel@gmail.com',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      user_id: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to get user profile with wrong id', async () => {
    const inMemoryDatabase = new DataBaseInMemory()
    const inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryDatabase,
    )
    const sut = new GetUserProfileUseCase(inMemoryUsersRepository)

    expect(() =>
      sut.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
