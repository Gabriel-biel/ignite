import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckinUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'

let inMemoryCheckinsRepository: InMemoryCheckinsRepository
let sut: ValidateCheckinUseCase

describe('Validate check-in Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckinsRepository = new InMemoryCheckinsRepository()
    sut = new ValidateCheckinUseCase(inMemoryCheckinsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await inMemoryCheckinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckinsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })
  it('should not be able to validate an inexistent check in', async () => {
    expect(() =>
      sut.execute({
        checkInId: 'Inexistent Check-In',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should no to be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await inMemoryCheckinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
