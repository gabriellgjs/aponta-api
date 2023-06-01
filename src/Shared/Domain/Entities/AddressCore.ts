interface AddressProps {
  id?: number;
  street: string;
  number: string;
  district: string;
  city: string;
  postal_code: string;
  state: string;
}

export default class AddressCore {
  private props: AddressProps;

  constructor(props: AddressProps) {
    this.props = {
      ...props,
    };
  }

  get street(): string {
    return this.props.street;
  }

  set street(street: string) {
    this.props.street = street;
  }
  get number(): string {
    return this.props.number;
  }

  set number(number: string) {
    this.props.number = number;
  }

  get district(): string {
    return this.props.district;
  }

  set district(district: string) {
    this.props.district = district;
  }

  get city(): string {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
  }

  get postal_code(): string {
    return this.props.postal_code;
  }

  set postalCode(postal_code: string) {
    this.props.postal_code = postal_code;
  }

  get state(): string {
    return this.props.state;
  }

  set state(state: string) {
    this.props.state = state;
  }

  get id(): number {
    return this.props.id ? this.props.id : 0;
  }

  set id(id: number) {
    this.props.id = id;
  }
}
