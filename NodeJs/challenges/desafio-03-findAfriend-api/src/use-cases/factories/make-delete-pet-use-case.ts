import { PrismaPetsRepository } from '@/repositories/prismaRepository/prismaPetsRepository'
import { DeletePetUseCase } from '../delete-pet'

export function MakeDeletePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const deletePetUseCase = new DeletePetUseCase(prismaPetsRepository)

  return deletePetUseCase
}
