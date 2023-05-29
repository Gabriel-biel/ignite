import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('shuld be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Gabriel',
      email: 'gabriel@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('not should be able to register with same email twice', async () => {
    const email = 'gabriel97gla98@gmail.com'

    await sut.execute({
      name: 'Gabriel biel',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Gabriel biel',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
