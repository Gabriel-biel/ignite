import { Minus, Plus } from 'phosphor-react'
import { ButtonsIncreaseDecrease } from './styles'

interface QuantityProps {
  quantity: number
  handleDecrease: () => void
  handleIncrease: () => void
}

export function QuantitySelector({
  quantity,
  handleIncrease,
  handleDecrease,
}: QuantityProps) {
  return (
    <ButtonsIncreaseDecrease>
      <button disabled={quantity <= 1} onClick={handleDecrease}>
        <Minus size={14} weight="bold" />
      </button>
      <p>{quantity}</p>
      <button onClick={handleIncrease}>
        <Plus size={14} weight="bold" />
      </button>
    </ButtonsIncreaseDecrease>
  )
}
