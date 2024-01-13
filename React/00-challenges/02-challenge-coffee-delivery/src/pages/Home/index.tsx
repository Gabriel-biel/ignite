import { coffees } from '../../server/coffee'
import { CoffeeCard } from './components/CoffeeCard'
import { Intro } from './components/intro'
import { CoffeeContainer, CoffeeList, HomeContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <Intro />
      <CoffeeContainer>
        <h2>Nossos Cafés</h2>
        <CoffeeList>
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </CoffeeList>
      </CoffeeContainer>
    </HomeContainer>
  )
}
