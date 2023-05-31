import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetPetByCityUseCase } from './get-pet-by-city'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetByCityUseCase

describe.skip('Get pet by city use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetByCityUseCase(inMemoryPetsRepository)
  })
  it('should be able to get list the pets for city', async () => {
    await inMemoryPetsRepository.create({
      id: 'Pet one for test',
      type: 'Cat',
      race: 'Viralata',
      description: 'Gato resgatado das ruas',
      org_id: 'org-id',
    })

    await inMemoryPetsRepository.create({
      id: 'Pet two for test',
      type: 'Cat',
      race: 'Viralata',
      description: 'Gato resgatado das ruas',
      org_id: 'org-id',
    })

    const { pets } = await sut.execute({
      city: 'Lábrea',
    })

    expect(inMemoryPetsRepository.items).toHaveLength(2)
    expect(pets).toEqual([expect.objectContaining({ city: 'Lábrea' })])
  })
})
