import { Entity } from '@/core/entities/entity'

export interface RecipientProps {
  name: string
  email: string
}

export class Recipient extends Entity<RecipientProps> {}
