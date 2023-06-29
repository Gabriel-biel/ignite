import { UsersRepository } from '@/repositories/users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUserUseCase } from '../register-user'
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-users-repository'
import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

let inMemoryDatabase: DatabaseInMemory
let usersRepository: UsersRepository
let sut: RegisterUserUseCase

describe('Register test use case', async () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    usersRepository = new InMemoryUsersRepository(inMemoryDatabase)
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register user', async () => {
    const { user } = await sut.execute({
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(expect.objectContaining({ name: 'Gabriel' }))
  })

  it('should not be able to register same email twice', async () => {
    const email = 'gabriel@gmail.com'

    await sut.execute({
      name: 'Gabriel',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Gabriel',
        email: 'gabriel@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
