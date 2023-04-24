import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckinUseCase } from './check-in'

let inMemoryCheckinsRepository: InMemoryCheckinsRepository
let sut: CheckinUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryCheckinsRepository = new InMemoryCheckinsRepository()
    sut = new CheckinUseCase(inMemoryCheckinsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
    })

    await expect(() =>
      sut.execute({
        userId: 'Qualquer',
        gymId: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice in diferent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
