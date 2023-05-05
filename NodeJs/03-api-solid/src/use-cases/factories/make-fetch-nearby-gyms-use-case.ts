import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchGymsNearbyUseCase } from '../fetch-nearby-gym'

export function makeFetchGymsNearbyUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchGymsNearbyUseCase(gymsRepository)

  return useCase
}
