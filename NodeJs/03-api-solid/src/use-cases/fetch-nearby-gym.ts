import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

interface FetchGymsNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchGymsNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchGymsNearbyUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchGymsNearbyUseCaseRequest): Promise<FetchGymsNearbyUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latidude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
