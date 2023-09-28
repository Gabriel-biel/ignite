import { HashCompare } from '@/domain/forum/aplication/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/aplication/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashCompare {
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }

  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
}
