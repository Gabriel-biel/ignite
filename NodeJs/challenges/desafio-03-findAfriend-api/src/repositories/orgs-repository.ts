import { Org } from '@prisma/client'

export interface IOrg {
  id?: string
  title: string
  description: string
  email: string
  password_hash: string
  role?: 'ADMIN' | 'MEMBER'
  addresses?: {
    city: string
    phone: string
    street: string
  }
}

export interface OrgsRepository {
  create(data: IOrg): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  searchMany(query: string, page: number): Promise<Org[]>
}
