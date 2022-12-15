import { useEffect, useState } from 'react'
import { CoffeeCard } from '../../components/CoffeeCard'
import { Coffee } from '../../Reducers/Coffee/reducer'
import { api } from '../../services/api'
import { Intro } from './Intro/Index'
import { HomeContainer, CoffeeList } from './styles'

export function Home() {
  const [cafes, setCafes] = useState<Coffee[]>([])

  useEffect(() => {
    async function loadCafes() {
      const response = await api.get<Coffee[]>('/cafes')
      setCafes(response.data)
    }

    loadCafes()
  }, [])

  return (
    <HomeContainer>
      <Intro />
      <h2>Nossos cafés</h2>
      <CoffeeList>
        {cafes.map((cafe) => {
          return (
            <CoffeeCard
              key={cafe.id}
              title={cafe.title}
              tags={cafe.tags}
              description={cafe.description}
              price={cafe.price}
              image={cafe.image}
            />
          )
        })}
      </CoffeeList>
    </HomeContainer>
  )
}
