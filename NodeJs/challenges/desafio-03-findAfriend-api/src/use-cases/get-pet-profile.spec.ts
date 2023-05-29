import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetPetProfileUseCase } from './get-pet-profile'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get pet profile use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(inMemoryPetsRepository)
  })
  it('should be able to get pet profile', async () => {
    await inMemoryPetsRepository.create({
      id: 'Pet for test',
      type: 'Cat',
      race: 'Viralata',
      city: 'Lábrea',
      description: 'Gato resgatado das ruas',
      org_id: 'org-id',
    })

    const createdPet = await inMemoryPetsRepository.create({
      id: 'Pet for tests TDD',
      type: 'Cat',
      race: 'Viralata',
      city: 'Lábrea',
      description: 'Gato resgatado das ruas',
      org_id: 'org-id',
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(inMemoryPetsRepository.items).toHaveLength(2)
    expect(pet.id).toEqual('Pet for tests TDD')
  })

  it('should be able to get pet profile with wrong id', async () => {
    const inMemoryPetsRepository = new InMemoryPetsRepository()
    const sut = new GetPetProfileUseCase(inMemoryPetsRepository)

    expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
