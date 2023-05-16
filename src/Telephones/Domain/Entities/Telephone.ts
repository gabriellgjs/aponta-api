interface TelephoneProps {
  telephone: string;
}

export class Telephone {
  private props: TelephoneProps;

  constructor(props: TelephoneProps) {
    const isTelephoneLenght = this.validateTelephone(props.telephone);

    if (!isTelephoneLenght) {
      throw new Error('Telephone lenght error');
    }

    this.props = {
      ...props,
    } ;
  }

  private validateTelephone(telephone: string): boolean {
    return telephone.length >= 10 && telephone.length <= 14;
  }

  set telephone(telephone: string) {
    this.props.telephone = telephone;
  }

  get telephone(): string {
    return this.props.telephone;
  }
}