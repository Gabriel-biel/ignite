import { Encrypter } from '@/domain/forum/aplication/cryptography/encypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
