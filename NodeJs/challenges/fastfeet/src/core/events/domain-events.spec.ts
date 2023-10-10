import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-Event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date

  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch an listen to events', async () => {
    const callBackSpy = vi.fn()

    // subscriber cadastrado (ouvindo evento de 'resposta criada'
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name)

    // estou criando uma resposta porém sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado porém não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // o subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callBackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
