import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get suer profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })
  it('should be able to get profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Jhon Doe')
  })
  it('should not be able to get user profile with wrong id', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new GetUserProfileUseCase(inMemoryUsersRepository)

    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
