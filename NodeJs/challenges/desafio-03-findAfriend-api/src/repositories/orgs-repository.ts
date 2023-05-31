import { Org } from '@prisma/client'

export interface OrgCreateInput {
  id?: string
  title: string
  description?: string
  email: string
  password_hash: string
  role?: 'ADMIN' | 'MEMBER'
  pets?: string
  addresses: {
    city: string
    phone: string
    street: string
  }
}

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  searchMany(query: string, page: number): Promise<Org[]>
  create(data: OrgCreateInput): Promise<Org>
}
