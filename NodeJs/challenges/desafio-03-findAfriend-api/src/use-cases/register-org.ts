import { Org, OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterOrgUseCaseRequest {
  id?: string
  name: string
  email: string
  password: string
  role?: 'Admin' | 'Member'
  created_at?: Date | string
  addresses: {
    street: string
    city: string
    phone: string
  }
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepositories: OrgsRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    role,
    addresses,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepositories.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgRepositories.create({
      id,
      name,
      email,
      password_hash,
      role,
      addresses,
    })
    return { org }
  }
}
