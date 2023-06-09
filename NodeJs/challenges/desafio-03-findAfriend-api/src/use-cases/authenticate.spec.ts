import { expect, describe, it, beforeEach } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let inMemoryDatabase: DataBaseInMemory
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryUsersRepository = new InMemoryUsersRepository(inMemoryDatabase)
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new AuthenticateUseCase(
      inMemoryOrgsRepository,
      inMemoryUsersRepository,
    )
  })
  it('should be able to authenticate', async () => {
    await inMemoryOrgsRepository.create({
      description: 'Organization of the cats',
      title: 'Org for cats',
      email: 'org@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { authUser } = await sut.execute({
      email: 'org@gmail.com',
      password: '123456',
    })

    expect(authUser.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryDatabase = new DataBaseInMemory()
    const inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryDatabase,
    )
    const inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    const sut = new AuthenticateUseCase(
      inMemoryOrgsRepository,
      inMemoryUsersRepository,
    )

    await inMemoryOrgsRepository.create({
      description: 'Organization of the Dogs',
      title: 'org jhon Doe',
      email: 'org@gmail.com',
      password_hash: '123456',
      addresses: {
        city: 'Lábrea',
        street: 'Rua São Lazaro',
        phone: '98989898',
      },
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryDatabase = new DataBaseInMemory()
    const inMemoryUsersRepository = new InMemoryUsersRepository(
      inMemoryDatabase,
    )
    const inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    const sut = new AuthenticateUseCase(
      inMemoryOrgsRepository,
      inMemoryUsersRepository,
    )

    await inMemoryOrgsRepository.create({
      description: 'Organization of the Lhamas',
      title: 'org jhon Doe',
      email: 'org@gmail.com',
      password_hash: '123456',
      addresses: {
        city: 'Lábrea',
        street: 'Rua São Lazaro',
        phone: '98989898',
      },
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
