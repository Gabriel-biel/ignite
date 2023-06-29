import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteOrgUseCase } from '../delete-org'

let inMemoryDatabase: DatabaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: DeleteOrgUseCase

describe('Delete Org test use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new DeleteOrgUseCase(inMemoryOrgsRepository)
  })

  it('Should be able to delete org', async () => {
    const createdOrg = await inMemoryOrgsRepository.create({
      name: 'Org dogs',
      email: 'dogsOrg@gmail.com',
      password_hash: '123456',
    })

    await sut.execute({ orgId: createdOrg.id })

    const org = await inMemoryOrgsRepository.findById(createdOrg.id)

    expect(org).toEqual(null)
  })
})
