import { useEffect, useState } from 'react'
import { CoffeeCard } from '../../components/CoffeeCard'
import { api } from '../../services/api'
import { formatPrice } from '../../util/format'
import { Intro } from './Intro/Index'
import { HomeContainer, CoffeeList } from './styles'

interface CoffeeProps {
  id: number
  type: string
  title: string
  description: string
  price: number
  image?: string | any
}

interface PriceProductFormatted extends CoffeeProps {
  priceFormatted: string
}

export function Home() {
  const [coffee, setCoffee] = useState<PriceProductFormatted[]>()

  useEffect(() => {
    async function loadCofees() {
      const response = await api.get<PriceProductFormatted[]>('/cafes')

      const productPriceFormatted = response.data.map((cafe) => {
        cafe.priceFormatted = formatPrice(cafe.price)
        return cafe
      })

      setCoffee(productPriceFormatted)
    }
    loadCofees()
  }, [])

  console.log(coffee)

  return (
    <HomeContainer>
      <Intro />
      <h2>Nossos cafés</h2>
      <CoffeeList>
        {coffee?.map((cafe) => (
          <CoffeeCard
            key={cafe.id}
            title={cafe.title}
            type={cafe.type}
            description={cafe.description}
            price={cafe.priceFormatted}
            image={cafe.image}
          />
        ))}
      </CoffeeList>
    </HomeContainer>
  )
}
