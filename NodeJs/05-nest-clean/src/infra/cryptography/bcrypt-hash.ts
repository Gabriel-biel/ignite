import { HashCompare } from '@/domain/forum/aplication/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/aplication/cryptography/hash-generator'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashCompare {
  hash(plain: string): Promise<string> {
    return hash(plain, 8)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
