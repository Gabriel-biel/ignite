import { describe, beforeEach, it, expect } from 'vitest'

import { hash } from 'bcryptjs'
import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'
import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { SearchPetFilterUseCase } from '../search-pet-by-filter'

let inMemoryDatabase: DatabaseInMemory
let inMemoryOrgRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: SearchPetFilterUseCase

describe('Fetch pets by Filter', () => {
  beforeEach(async () => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryOrgRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    sut = new SearchPetFilterUseCase(inMemoryPetsRepository)

    const org = await inMemoryOrgRepository.create({
      name: 'Org-cats',
      email: 'org@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'Member',
      addresses: {
        city: 'Manaus',
        street: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

    await inMemoryPetsRepository.create({
      id: 'Pet for tests TDD',
      name: 'Eliot',
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

    await inMemoryPetsRepository.create({
      id: 'Pet for tests TDD',
      name: 'Theodoro',
      age: 'Adulto',
      size: 'Grande',
      energy_level: 'Baixa',
      independence_level: 'Alto',
      ambience: 'Amplo',
      requirements: {
        description: 'Necessita Atenção',
      },
      available: new Date(),
      org_id: org.id,
      description: 'Gato resgatado das ruas',
    })
  })

  it('should be able to fetch pets by age', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        age: 'Filhote',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ age: 'Filhote' })])
  })

  it('should be able to fetch pets by energy_level', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        energy_level: 'Baixa',
      },
      page: 1,
    })

    expect(pets).toEqual([expect.objectContaining({ energy_level: 'Baixa' })])
  })

  it('should be able to fetch pets by independency_level', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        independence_level: 'Baixo',
      },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({ independence_level: 'Baixo' }),
    ])
  })

  it('should be able to fetch pets by habitation', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        ambience: 'Amplo',
      },
      page: 1,
    })

    expect(pets).toEqual([expect.objectContaining({ ambience: 'Amplo' })])
  })
  it('should be able to fetch pets by port', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        size: 'Pequenino',
      },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        size: 'Pequenino',
      }),
    ])
  })
})
