import { Deliveryman } from '../../enterprise/entities/deliveryman'

export interface DeliverymanRepository {
  create(deliveryman: Deliveryman): Promise<void>
  findById(deliverymanId: string): Promise<Deliveryman | null>
  findByCpf(cpf: string): Promise<Deliveryman | null>
  delete(deliveryman: Deliveryman): Promise<void>
  save(deliveryman: Deliveryman): Promise<void>
}
