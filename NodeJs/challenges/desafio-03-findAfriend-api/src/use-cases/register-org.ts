import { AddressesRepository } from '@/repositories/addresses-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found'

export interface RegisterOrgUseCaseRequest {
  title: string
  description: string
  email: string
  password: string
  addresses: {
    city: string
    phone: string
    street: string
  }
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(
    private orgRepository: OrgsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    title,
    description,
    email,
    password,
    addresses,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const org = await this.orgRepository.create({
      title,
      description,
      email,
      password_hash,
      addresses,
    })

    // await this.addressesRepository.create({
    //   city: addresses.city,
    //   street: addresses.street,
    //   phone: addresses.phone,
    //   org_id: org.id,
    // })

    return { org }
  }
}
