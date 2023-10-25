import { UseCaseError } from '@/core/errors/use-case-erro'

export class OrderAlreadyExists extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Order "${identifier}" already exists`)
  }
}
