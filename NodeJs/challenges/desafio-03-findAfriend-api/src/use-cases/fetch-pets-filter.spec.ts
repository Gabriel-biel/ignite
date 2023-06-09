import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FetchPetsFilterUseCase } from './fetch-pets-filter'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let inMemoryDatabase: DataBaseInMemory
let inMemoryOrgRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: FetchPetsFilterUseCase

describe('Fetch pets by Filter', () => {
  beforeEach(async () => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryOrgRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    sut = new FetchPetsFilterUseCase(inMemoryPetsRepository)

    const org = await inMemoryOrgRepository.create({
      title: 'Org-cats',
      description: 'Orgs for cats',
      email: 'org@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'MEMBER',
      addresses: {
        city: 'Manaus',
        street: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

    await inMemoryPetsRepository.create({
      id: 'Pet for tests TDD',
      name: 'Eliot',
      age: 'FILHOTE',
      porte: 'PEQUENINO',
      energy_level: 'ALTO',
      independence_level: 'BAIXA',
      environment: 'PEQUENO',
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
      age: 'ADULTO',
      porte: 'GRANDE',
      energy_level: 'BAIXA',
      independence_level: 'ALTA',
      environment: 'AMPLO',
      requirements: {
        description: 'Liverdade para explorar o ambiente',
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
        age: 'FILHOTE',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ age: 'FILHOTE' })])
  })

  it('should be able to fetch pets by energy_level', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        energy_level: 'BAIXA',
      },
      page: 1,
    })

    expect(pets).toEqual([expect.objectContaining({ energy_level: 'BAIXA' })])
  })

  it('should be able to fetch pets by independency_level', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        independence_level: 'BAIXA',
      },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({ independence_level: 'BAIXA' }),
    ])
  })

  it('should be able to fetch pets by habitation', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        environment: 'AMPLO',
      },
      page: 1,
    })

    expect(pets).toEqual([expect.objectContaining({ environment: 'AMPLO' })])
  })
  it('should be able to fetch pets by port', async () => {
    const { pets } = await sut.execute({
      query: {
        city: 'Manaus',
        porte: 'PEQUENINO',
      },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        porte: 'PEQUENINO',
      }),
    ])
  })
})
