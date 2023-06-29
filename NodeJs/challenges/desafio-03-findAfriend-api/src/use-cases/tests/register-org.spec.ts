import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from '../register-org'
import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

let inMemoryDatabase: DatabaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register org test use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new RegisterOrgUseCase(inMemoryOrgsRepository)
  })

  it('Should be able to register org', async () => {
    const { org } = await sut.execute({
      name: 'Org cats',
      email: 'orgcats@gmail.com',
      password: '123456',
      addresses: {
        city: 'Lábrea',
        street: 'Luiz Falcão',
        phone: '9898989898',
      },
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.created_at).toEqual(expect.any(Date))
  })

  it('Should not be able to regiser same email twice', async () => {
    const email = 'orgcats@gmail.com'

    await sut.execute({
      name: 'Org cats',
      email,
      password: '123456',
      addresses: {
        city: 'Lábrea',
        street: 'Luiz Falcão',
        phone: '9898989898',
      },
    })

    await expect(() =>
      sut.execute({
        name: 'Org cats',
        email,
        password: '123456',
        addresses: {
          city: 'Lábrea',
          street: 'Luiz Falcão',
          phone: '9898989898',
        },
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
