import { beforeEach, describe, it, expect } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'

let inMemoryDatabase: DataBaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('register orgs Use Case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new RegisterOrgUseCase(inMemoryOrgsRepository)
  })
  it('should be able to registe org', async () => {
    const { org } = await sut.execute({
      title: 'Org-cats',
      description: 'Orgs for cats',
      email: 'org@gmail.com',
      password: '123456',
      addresses: {
        city: 'Manaus',
        street: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jhondoe@gmail.com'

    await sut.execute({
      title: 'Org Jhon Doe',
      email,
      description: 'org qualquer',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        title: 'Org joãozinho',
        email,
        description: 'org qualquer',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
