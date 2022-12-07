import { IntroContainer, IntroTitle, Advantages } from './styles'
import imagemCoffee from '../../../assets/Imagem.svg'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
export function Intro() {
  return (
    <IntroContainer>
      <IntroTitle>
        <h1>
          Encontre o café perfeito <br /> para qualquer hora do dia
        </h1>
        <p>
          Com o Coffee Delivery você recebe seu café onde estiver, a <br />{' '}
          qualquer hora
        </p>
        <Advantages>
          <ShoppingCart weight="fill" />
          <p>Compra Simples e segura</p>
          <Package weight="fill" />
          <p>Embalagem mantém o café intacto</p>
          <Timer weight="fill" />
          <p>Entrega rápida e rastreada</p>
          <Coffee weight="fill" />
          <p>O café chega fresquinho até você</p>
        </Advantages>
      </IntroTitle>
      <img src={imagemCoffee} alt="Copo de café com logo da Coffee Delivery" />
    </IntroContainer>
  )
}
