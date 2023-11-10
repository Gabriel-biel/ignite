import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AddressProps {
  recipientId: UniqueEntityID
  city: string
  street: string
  house_number: string
  latitude: number
  longitude: number
}

export class Address extends Entity<AddressProps> {
  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
  }

  get house_number() {
    return this.props.house_number
  }

  set house_number(houseNumber: string) {
    this.props.house_number = houseNumber
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  static create(props: AddressProps, id?: UniqueEntityID) {
    const address = new Address(
      {
        ...props,
      },
      id,
    )

    return address
  }
}
