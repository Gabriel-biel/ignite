import axios from 'axios'
import { useEffect, useState } from 'react'
import { CoffeeCard } from '../../components/CoffeeCard'
import { formatPrice } from '../../util/format'
import { Intro } from './Intro/Index'
import { HomeContainer, CoffeeList } from './styles'

interface CoffeeProps {
  id: number
  title: string
  price: number
  image?: string
}

interface PriceProductFormatted extends CoffeeProps {
  priceFormatted: string
}

export function Home() {
  const [coffee, setCoffee] = useState<PriceProductFormatted[]>()

  useEffect(() => {
    async function loadCofees() {
      const response = await axios.get<PriceProductFormatted>('/cafes')

      const formattedProducts = response.data.map((cafe) => {
        cafe.priceFormatted = formatPrice(cafe.price)
        return cafe
      })
      setCoffee(formattedProducts)
    }
    loadCofees()
  }, [])

  return (
    <HomeContainer>
      <Intro />
      <h2>Nossos cafés</h2>
      <CoffeeList>
        {coffee?.map((cafe) => {
          ;<CoffeeCard />
        })}
      </CoffeeList>
    </HomeContainer>
  )
}
