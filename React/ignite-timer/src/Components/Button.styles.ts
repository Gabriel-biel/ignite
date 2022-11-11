import styled from 'styled-components'

export type ButtonVariantColors = 'primary' | 'secundary' | 'sucess' | 'danger'

interface ButtonContainerProps {
  changeColor: ButtonVariantColors
}

const ButtonVariants = {
  primary: 'purple',
  secundary: 'orange',
  sucess: 'green',
  danger: 'red',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background: ${(props) => props.theme['green-500']};
  color: white;

  /* ${(props) => {
    return `background: ${ButtonVariants[props.changeColor]}`
  }} */
`
