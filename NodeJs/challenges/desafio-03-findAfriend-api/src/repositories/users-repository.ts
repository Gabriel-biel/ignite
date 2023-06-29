export interface CreatedUser {
  id?: string
  name: string
  email: string
  password_hash: string
  role?: 'Admin' | 'Member'
  created_at?: Date | string
}

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: string
  created_at: Date | string
}

export interface UsersRepository {
  create(data: CreatedUser): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(id: string): Promise<void>
}
