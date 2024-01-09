import AddressCore from '@shared/domain/entities/address/addressCore'
import TelephoneCore from '@shared/domain/entities/telephone/telephoneCore'
import { PeopleProps } from './types/peopleCoreProps'

export default abstract class PeopleCore {
  protected props: PeopleProps

  protected constructor(props: PeopleProps) {
    this.props = {
      ...props,
    }
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get maritalStatus(): string {
    return this.props.maritalStatus ?? ''
  }

  set maritalStatus(maritalStatus: string) {
    this.props.maritalStatus = maritalStatus
  }

  get birthDate(): Date {
    return this.props.birthDate
  }

  set birthDate(date: Date) {
    this.props.birthDate = date
  }

  get rg(): string {
    return this.props.rg
  }

  set rg(rg: string) {
    this.props.rg = rg
  }

  get cpf(): string {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get telephone(): TelephoneCore {
    return this.props.telephone
  }

  set telephone(telephone: TelephoneCore) {
    this.props.telephone = telephone
  }

  get address(): AddressCore {
    return this.props.address
  }

  set address(address: AddressCore) {
    this.props.address = address
  }

  get gender(): string {
    return this.props.gender
  }

  set gender(gender: string) {
    this.props.gender = gender
  }
}
