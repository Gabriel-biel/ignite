import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

import { SearchGymUseCase } from './search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym use case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to fetch to search for gyms ', async () => {
    await inMemoryGymsRepository.create({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -7.268306,
      longitude: -64.795441,
    })
    await inMemoryGymsRepository.create({
      title: 'Typescript gym',
      description: null,
      phone: null,
      latitude: -7.268306,
      longitude: -64.795441,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript gym' })])
  })

  it('should be able to fetch paginated check-in history ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Javascript gym ${i}`,
        description: null,
        phone: null,
        latitude: -7.268306,
        longitude: -64.795441,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript gym 21' }),
      expect.objectContaining({ title: 'Javascript gym 22' }),
    ])
  })
})
