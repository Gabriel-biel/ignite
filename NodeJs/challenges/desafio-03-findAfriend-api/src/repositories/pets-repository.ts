export interface CreatedPet {
  id?: string
  name: string
  description: string
  age: 'Filhote' | 'Adolescente' | 'Adulto'
  size: 'Pequenino' | 'Medio' | 'Grande'
  energy_level: 'Baixa' | 'Medio' | 'Alto'
  independence_level: 'Baixo' | 'Medio' | 'Alto'
  ambience: 'Pequeno' | 'Amplo' | 'Grande'
  available: Date | null
  requirements?: {
    description: string
  }
  org_id: string
}

export interface searchPetsQuery {
  city: string
  age?: 'Filhote' | 'Adolescente' | 'Adulto'
  size?: 'Pequenino' | 'Medio' | 'Grande'
  energy_level?: 'Baixa' | 'Medio' | 'Alto'
  independence_level?: 'Baixo' | 'Medio' | 'Alto'
  ambience?: 'Pequeno' | 'Amplo' | 'Grande'
}

export interface Pet {
  id: string
  name: string
  description: string
  age: 'Filhote' | 'Adolescente' | 'Adulto'
  size: 'Pequenino' | 'Medio' | 'Grande'
  energy_level: 'Baixa' | 'Medio' | 'Alto'
  independence_level: 'Baixo' | 'Medio' | 'Alto'
  ambience: 'Pequeno' | 'Amplo' | 'Grande'
  available: Date | null
  requirements?: {
    description: string
  }
  org_id: string
}

export interface PetsRepository {
  create(data: CreatedPet): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  delete(id: string): Promise<void>
  searchByCity(city: string): Promise<Pet[]>
  searchMany(query: searchPetsQuery, page: number): Promise<Pet[]>
}
