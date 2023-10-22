import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { DeliverymanRepository } from '@/domain/delivery-management/application/repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/delivery-management/enterprise/entities/deliveryman'

export class InMemoryDeliverymansRepository implements DeliverymanRepository {
  public items: Deliveryman[] = []

  constructor(private addressRepository: AddressRepository) {}

  async create(deliveryman: Deliveryman) {
    this.items.push(deliveryman)

    if (deliveryman.address) {
      await this.addressRepository.create(deliveryman.address)
    }
  }

  async findById(deliverymanId: string) {
    const deliveryman = this.items.find(
      (item) => item.id.toString() === deliverymanId,
    )

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async findByCpf(cpf: string) {
    const deliveryman = this.items.find((item) => item.cpf === cpf)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async delete(deliveryman: Deliveryman) {
    const item = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items.splice(item, 1)
  }

  async save(deliveryman: Deliveryman) {
    const item = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items[item] = deliveryman
  }
}