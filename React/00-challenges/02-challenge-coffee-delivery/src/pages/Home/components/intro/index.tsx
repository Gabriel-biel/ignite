import {
  Info,
  InfosContainer,
  InfosGrup,
  IntroContainer,
  Title,
} from './styles'
import imageBackground from './../../../../assets/Imagem.svg'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { Icon } from '../../../../components/icon'

export function Intro() {
  return (
    <IntroContainer>
      <InfosContainer>
        <Title>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <span>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </span>
        </Title>
        <InfosGrup>
          <Info>
            <Icon iconName="cart">
              <ShoppingCart size={16} weight="fill" />
            </Icon>
            Compra simples e segura
          </Info>
          <Info>
            <Icon iconName="package">
              <Package size={16} weight="fill" />
            </Icon>
            Embalagem mantém o café intacto
          </Info>
          <Info>
            <Icon iconName="timer">
              <Timer size={16} weight="fill" />
            </Icon>
            Entrega rápida e rastreada
          </Info>
          <Info>
            <Icon iconName="coffee">
              <Coffee size={16} weight="fill" />
            </Icon>
            O café chega fresquinho até você
          </Info>
        </InfosGrup>
      </InfosContainer>
      <img src={imageBackground} alt="" />
    </IntroContainer>
  )
}
