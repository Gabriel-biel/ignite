export interface CreateOrg {
  id?: string
  name: string
  email: string
  password_hash: string
  role?: 'Admin' | 'Member'
  addresses?: {
    city: string
    street: string
    phone: string
  }
  created_at?: Date | string
}

export interface Org {
  id: string
  name: string
  email: string
  password_hash: string
  role?: 'Admin' | 'Member'
  addresses?: {
    city: string
    street: string
    phone: string
  }
  created_at?: Date | string
}

export interface OrgsRepository {
  create(data: CreateOrg): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  delete(id: string): Promise<void>
}
