import { ButtonContainer, ButtonVariantColors } from './Button.styles'

interface ButtonProps {
  changeColor?: ButtonVariantColors
}

export function Button({ changeColor = 'primary' }: ButtonProps) {
  return <ButtonContainer changeColor={changeColor}>Enviar</ButtonContainer>
}
