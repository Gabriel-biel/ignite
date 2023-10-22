import { UseCaseError } from '@/core/errors/use-case-erro'

export class DeliverymanAlreadyExists extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Deliveryman "${identifier}" already exists`)
  }
}
