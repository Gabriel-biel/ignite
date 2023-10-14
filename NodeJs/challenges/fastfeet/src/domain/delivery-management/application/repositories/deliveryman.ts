import { Deliveryman } from '../../enterprise/entity/deliveryman'

export interface DeliverymanRepository {
  create(deliveryman: Deliveryman): Promise<void>
  findById(deliverymanId: string): Promise<Deliveryman | null>
  findByEmail(email: string): Promise<Deliveryman | null>
  delete(deliveryman: Deliveryman): Promise<void>
  save(deliveryman: Deliveryman): Promise<void>
}
