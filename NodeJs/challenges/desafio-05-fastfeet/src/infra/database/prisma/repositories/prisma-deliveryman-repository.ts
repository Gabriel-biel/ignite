import { DeliverymanRepository } from '@/domain/delivery-management/application/repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/delivery-management/enterprise/entities/deliveryman'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {
  create(deliveryman: Deliveryman): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(deliverymanId: string): Promise<Deliveryman | null> {
    throw new Error('Method not implemented.')
  }

  findByCpf(cpf: string): Promise<Deliveryman | null> {
    throw new Error('Method not implemented.')
  }

  delete(deliveryman: Deliveryman): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(deliveryman: Deliveryman): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
