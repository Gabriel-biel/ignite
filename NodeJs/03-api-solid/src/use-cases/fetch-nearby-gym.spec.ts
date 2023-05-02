import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'

import { FetchGymsNearbyUseCase } from './fetch-nearby-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchGymsNearbyUseCase

describe('Fetch Nearby Gym use case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchGymsNearbyUseCase(inMemoryGymsRepository)
  })

  it('should be able to fetch to nearby gyms ', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -7.268306,
      longitude: -64.795441,
    })
    await inMemoryGymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -7.1503576,
      longitude: -64.6416216,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.268306,
      userLongitude: -64.795441,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
