import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/checkins-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkinRepository: CheckinsRepository,
    private gymsRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = GetDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_BETWEEN_GYMS_FOR_CHECKIN = 0.1

    if (distance > MAX_DISTANCE_BETWEEN_GYMS_FOR_CHECKIN) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
