import { MapPinLine } from 'phosphor-react'
import { TitleContainer } from './styles'

export function Title() {
  return (
    <TitleContainer>
      <MapPinLine size={22} />
      <div>
        <span>Endereço de Entrega</span>
        <p>Informe o endereço onde deseja receber seu pedido</p>
      </div>
    </TitleContainer>
  )
}
