import { expect, describe, it, beforeEach } from 'vitest'

import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(inMemoryOrgsRepository)
  })
  it('should be able to authenticate', async () => {
    await inMemoryOrgsRepository.create({
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
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(inMemoryOrgsRepository)

    await inMemoryOrgsRepository.create({
      title: 'org jhon Doe',
      email: 'org@gmail.com',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(inMemoryOrgsRepository)

    await inMemoryOrgsRepository.create({
      title: 'org jhon Doe',
      email: 'org@gmail.com',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
