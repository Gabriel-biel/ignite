import { ContactRepository } from '@/repositories/contact-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  title: string
  description: string
  email: string
  password: string
  contact: {
    phone: string
    address: string
  }
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(
    private orgRepository: OrgsRepository,
    private contactRepository: ContactRepository,
  ) {}

  async execute({
    title,
    description,
    email,
    password,
    contact: { address, phone },
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const org = await this.orgRepository.create({
      title,
      description,
      email,
      password_hash,
    })

    await this.contactRepository.create({
      address,
      phone,
      org_id: org.id,
    })

    return { org }
  }
}
