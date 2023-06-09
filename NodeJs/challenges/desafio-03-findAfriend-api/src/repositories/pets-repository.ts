import { Pet } from '@prisma/client'

export interface IPets {
  id?: string
  name: string
  description: string
  age: 'FILHOTE' | 'ADOLESCENTE' | 'ADULTO'
  porte: 'PEQUENINO' | 'MEDIO' | 'GRANDE'
  energy_level: 'BAIXA' | 'MEDIA' | 'ALTO'
  independence_level: 'BAIXA' | 'MEDIA' | 'ALTA'
  environment: 'PEQUENO' | 'GRANDE' | 'AMPLO'
  requirements: {
    description: string
  }
  available: Date | null
  org_id: string
}

export interface searchPetsQuery {
  city: string
  age?: 'FILHOTE' | 'ADOLESCENTE' | 'ADULTO'
  porte?: 'PEQUENINO' | 'MEDIO' | 'GRANDE'
  energy_level?: 'BAIXA' | 'MEDIA' | 'ALTO'
  independence_level?: 'BAIXA' | 'MEDIA' | 'ALTA'
  environment?: 'PEQUENO' | 'GRANDE' | 'AMPLO'
}

export interface PetsRepository {
  create(data: IPets): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchByCity(city: string): Promise<Pet[]>
  searchMany(query: searchPetsQuery, page: number): Promise<Pet[]>
}
