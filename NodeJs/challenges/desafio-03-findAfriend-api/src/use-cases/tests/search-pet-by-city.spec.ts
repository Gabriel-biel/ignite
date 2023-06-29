import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'
import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchPetByCityUseCase } from '../search-pet-by-city'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryDatabase: DatabaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: SearchPetByCityUseCase

describe('Search pet by city use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new SearchPetByCityUseCase(inMemoryPetsRepository)
  })
  it('should be able to get list the pets for city', async () => {
    const org = await inMemoryOrgsRepository.create({
      name: 'Cats Org',
      email: 'org@gmail.com',
      password_hash: '123456',
      role: 'Admin',
      addresses: {
        city: 'Lábrea',
        street: 'Rua São Lazaro',
        phone: '98989898',
      },
    })

    await inMemoryPetsRepository.create({
      id: 'Pet one for test',
      name: 'Gabs',
      age: 'Filhote',
      size: 'Pequenino',
      energy_level: 'Alto',
      independence_level: 'Baixo',
      ambience: 'Pequeno',
      requirements: {
        description: 'Necessita Atenção',
      },
      available: new Date(),
      org_id: org.id,
      description: 'Gato resgatado das ruas',
    })

    const { pets } = await sut.execute({
      city: 'Lábrea',
    })

    expect(inMemoryDatabase.pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Gabs' })])
  })
})
