import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'
import { Org } from '@prisma/client'

export interface RegisterOrgUseCaseRequest {
  title: string
  description: string
  email: string
  password: string
  addresses?: {
    city: string
    phone: string
    street: string
  }
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    title,
    description,
    email,
    password,
    addresses,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      title,
      description,
      email,
      password_hash,
      addresses,
    })

    return { org }
  }
}
