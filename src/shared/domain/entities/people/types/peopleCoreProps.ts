import AddressCore from '@shared/domain/entities/address/addressCore'
import TelephoneCore from '@shared/domain/entities/telephone/telephoneCore'

export interface PeopleProps {
  name: string
  birthDate: Date
  rg: string
  cpf: string
  gender: string
  telephone: TelephoneCore
  address: AddressCore
  maritalStatus?: string
}
