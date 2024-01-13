import { ReactNode } from 'react'
import { IconContainer, IconProps as IconColors } from './styles'

interface IconProps extends IconColors {
  children: ReactNode
}

export function Icon({ iconName, children }: IconProps) {
  return <IconContainer iconName={iconName}>{children}</IconContainer>
}
