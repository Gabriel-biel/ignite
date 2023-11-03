import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { ChooseBestAddressRecipientUseCase } from './choose-best-address-recipient'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { MakeAddress } from 'test/factories/make-address'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let chooseBestAddressRecipientUseCase: ChooseBestAddressRecipientUseCase

describe('Edit recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    chooseBestAddressRecipientUseCase = new ChooseBestAddressRecipientUseCase(
      inMemoryRecipientRepository,
      inMemoryAddressRepository,
    )
  })

  it('should be able to edit a recipient', async () => {
    const recipient = MakeRecipient()
    const address = MakeAddress({ recipientId: recipient.id })

    await inMemoryRecipientRepository.create(recipient)
    await inMemoryAddressRepository.create(address)

    const result = await chooseBestAddressRecipientUseCase.execute({
      addressId: address.id.toString(),
      recipientId: recipient.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        bestAddressId: address.id,
      }),
    })
  })
})
