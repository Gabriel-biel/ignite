import { beforeEach, describe, it, expect } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-addresses-repository'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryAddressesRepository: InMemoryAddressRepository
let sut: RegisterOrgUseCase

describe('register orgs Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(
      inMemoryOrgsRepository,
      inMemoryAddressesRepository,
    )
  })
  it('should be able to registe org', async () => {
    const { org } = await sut.execute({
      title: 'Org-cats',
      description: 'Orgs for cats',
      email: 'org@gmail.com',
      password: '123456',
      addresses: {
        city: 'Manaus',
        street: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

    expect(org.id).toEqual(expect.any(String))
    expect(inMemoryOrgsRepository.items).toEqual([
      expect.objectContaining({ city: 'Manaus' }),
    ])
  })
})
