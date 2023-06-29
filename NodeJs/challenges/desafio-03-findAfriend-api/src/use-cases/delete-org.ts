import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteOrgUseCaseRequest {
  orgId: string
}

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ orgId }: DeleteOrgUseCaseRequest): Promise<void> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    await this.orgsRepository.delete(org.id)
  }
}
