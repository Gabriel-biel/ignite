import { beforeEach, describe, it, expect } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryContactRepository } from '@/repositories/in-memory/in-memory-contact-repository'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryContactRepository: InMemoryContactRepository
let sut: RegisterOrgUseCase

describe('register orgs Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryContactRepository = new InMemoryContactRepository()
    sut = new RegisterOrgUseCase(
      inMemoryOrgsRepository,
      inMemoryContactRepository,
    )
  })
  it('should be able to registe org', async () => {
    const { org } = await sut.execute({
      title: 'Org-cats',
      description: 'Orgs for cats',
      email: 'org@gmail.com',
      password: '123456',
      contact: {
        address: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

    expect(org.id).toEqual(expect.any(String))
    expect(inMemoryContactRepository.items[0].id).toEqual(expect.any(String))
  })
})
