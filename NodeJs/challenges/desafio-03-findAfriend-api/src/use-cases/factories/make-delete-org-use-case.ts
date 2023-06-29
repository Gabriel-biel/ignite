import { PrismaOrgsRepository } from '@/repositories/prismaRepository/prismaOrgsRepository'
import { DeleteOrgUseCase } from '../delete-org'

export function MakeDeleteOrgUseCase() {
  const prismOrgsRepository = new PrismaOrgsRepository()
  const deleteOrgUseCase = new DeleteOrgUseCase(prismOrgsRepository)

  return deleteOrgUseCase
}
