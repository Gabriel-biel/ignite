import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetOrgProfileUseCase } from '../get-profile-org'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'

let inMemoryDatabase: DatabaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get org profile test use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new GetOrgProfileUseCase(inMemoryOrgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await inMemoryOrgsRepository.create({
      name: 'Org DOGS',
      email: 'prettidogs@gmail.com',
      password_hash: '123456',
      description: 'Org for dogs',
    })

    const { org } = await sut.execute({ orgId: createdOrg.id })

    expect(org.id).toEqual(expect.any(String))
    expect(org.created_at).toEqual(expect.any(Date))
  })
})
