import { expect, describe, it, beforeEach } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'

let inMemoryDatabase: DataBaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new AuthenticateUseCase(inMemoryOrgsRepository)
  })
  it('should be able to authenticate', async () => {
    await inMemoryOrgsRepository.create({
      description: 'Organization of the cats',
      title: 'Org for cats',
      email: 'org@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'org@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryDatabase = new DataBaseInMemory()
    const inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    const sut = new AuthenticateUseCase(inMemoryOrgsRepository)

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
    const inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    const sut = new AuthenticateUseCase(inMemoryOrgsRepository)

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
