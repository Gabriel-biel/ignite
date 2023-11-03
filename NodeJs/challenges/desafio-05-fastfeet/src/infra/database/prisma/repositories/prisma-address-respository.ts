import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { Address } from '@/domain/delivery-management/enterprise/entities/address'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAddressesRepository implements AddressRepository {
  create(address: Address): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(addressId: string): Promise<Address | null> {
    throw new Error('Method not implemented.')
  }
}
