import { ReactNode } from 'react'
import { TitleContainer } from './styles'

interface TitleProps {
  icon: ReactNode
  title: string
  description: string
}

export function Title({ icon, title, description }: TitleProps) {
  return (
    <TitleContainer>
      {icon}
      <div>
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </TitleContainer>
  )
}
