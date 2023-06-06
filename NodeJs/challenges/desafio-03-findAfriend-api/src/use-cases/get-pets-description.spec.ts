import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetPetsDescriptionUseCase } from './get-pets-description'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'

let inMemoryDatabase: DataBaseInMemory
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetsDescriptionUseCase

describe('Get pets by description', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    sut = new GetPetsDescriptionUseCase(inMemoryPetsRepository)
  })
  it('should be able to list pets by characteristics', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPetsRepository.create({
        id: 'Pet for test',
        type: 'Cat',
        race: 'Viralata',
        description: `Gato resgatado das ruas ${i}`,
        org_id: `org-id ${i}`,
      })
    }

    const { pets } = await sut.execute({
      query: 'Gato resgatado das ruas',
      page: 3,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ description: 'Gato resgatado das ruas 21' }),
      expect.objectContaining({ description: 'Gato resgatado das ruas 22' }),
    ])
  })
})
