import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get pet profile use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
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
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new GetUserProfileUseCase(inMemoryUsersRepository)

    expect(() =>
      sut.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
