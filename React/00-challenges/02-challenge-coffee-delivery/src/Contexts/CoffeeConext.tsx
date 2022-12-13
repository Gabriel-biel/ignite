import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Coffee {
  id: string
  title: string
  type: string
  description: string
  price: string
  image: string
}

interface CoffeeContextType {
  cafes: Coffee[]
}

export const CoffeeContext = createContext({} as CoffeeContextType)

interface CoffeeProviderProps {
  children: ReactNode
}

export function CoffeeContextProvider({ children }: CoffeeProviderProps) {
  const [cafes, setCafes] = useState<Coffee[]>([])

  useEffect(() => {
    async function loadCafes() {
      const response = await api.get<Coffee[]>('/cafes')
      setCafes(response.data)
    }

    loadCafes()
  }, [])

  return (
    <CoffeeContext.Provider
      value={{
        cafes,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  )
}
