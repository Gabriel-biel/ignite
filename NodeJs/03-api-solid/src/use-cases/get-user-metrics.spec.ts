import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let inMemoryCheckinsRepository: InMemoryCheckinsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckinsRepository = new InMemoryCheckinsRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckinsRepository)
  })

  it('should be able to get check-ins count from metrics ', async () => {
    await inMemoryCheckinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await inMemoryCheckinsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
