import { Encrypter } from '@/domain/delivery-management/application/cryptography/encypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
