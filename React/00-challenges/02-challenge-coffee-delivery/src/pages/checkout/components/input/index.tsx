import { InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'
import { InputContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  area?: string
  optional?: boolean
  mask?: string
}

export function Input({ area, optional = false, mask, ...rest }: InputProps) {
  return (
    <InputContainer style={{ gridArea: area }}>
      {mask ? (
        <InputMask mask={mask} required={!optional} {...rest} />
      ) : (
        <input required={!optional} {...rest} />
      )}
      {optional && <span>Opcional</span>}
    </InputContainer>
  )
}
