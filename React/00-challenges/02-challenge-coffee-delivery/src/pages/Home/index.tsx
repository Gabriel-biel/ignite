import { useContext } from 'react'
import { CoffeeCard } from '../../components/CoffeeCard'
import { CoffeeContext } from '../../Contexts/CoffeeConext'
import { Intro } from './Intro/Index'
import { HomeContainer, CoffeeList } from './styles'

export function Home() {
  const { cafes } = useContext(CoffeeContext)
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
              type={cafe.type}
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
