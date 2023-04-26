import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let inMemoryCheckinsRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryCheckinsRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(inMemoryCheckinsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Gym Javascript',
      description: '',
      phone: '',
      latitude: new Decimal(-7.268306),
      longitude: new Decimal(-64.795441),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
      userLatitude: -7.268306,
      userLongitude: -64.795441,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
      userLatitude: -7.268306,
      userLongitude: -64.795441,
    })

    await expect(() =>
      sut.execute({
        userId: 'Qualquer',
        gymId: 'gym-01',
        userLatitude: -7.268306,
        userLongitude: -64.795441,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
      userLatitude: -7.268306,
      userLongitude: -64.795441,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'Qualquer',
      gymId: 'gym-01',
      userLatitude: -7.268306,
      userLongitude: -64.795441,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym Javascript',
      description: '',
      phone: '',
      latitude: new Decimal(-7.266438),
      longitude: new Decimal(-64.795135),
    })

    await expect(() =>
      sut.execute({
        userId: 'Qualquer',
        gymId: 'gym-02',
        userLatitude: -7.268306,
        userLongitude: -64.795441,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
