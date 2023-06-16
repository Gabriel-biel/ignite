import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from './get-org-profile'
import { hash } from 'bcryptjs'

let inMemoryDatabase: DataBaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get org profile use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new GetOrgProfileUseCase(inMemoryOrgsRepository)
  })
  it('should be able to get org profile', async () => {
    const createdOrg = await inMemoryOrgsRepository.create({
      title: 'Org-cats',
      description: 'Orgs for cats',
      email: 'org@gmail.com',
      password_hash: await hash('123456', 6),
      addresses: {
        city: 'Manaus',
        street: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to get org profile with wrong id', async () => {
    const inMemoryDatabase = new DataBaseInMemory()
    const inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    const sut = new GetOrgProfileUseCase(inMemoryOrgsRepository)

    expect(() =>
      sut.execute({ orgId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
