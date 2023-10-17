export default class GeneratorErrorResponse {
  static emptyInputError(input: string) {
    return `O campo ${input} está vazio.`
  }

  static generateErrorMessageMinLength(input: string, min: number) {
    return `O campo ${input} deve ter no mínimo ${min} caracteres.`
  }

  static generateErrorMessageEmail() {
    return `Email inválido.`
  }

  static stringInputError(input: string) {
    return `O campo ${input} deve ser uma String.`
  }

  static dateInputError(input: string) {
    return `O campo ${input} deve ser uma Date.`
  }

  static numberInputError(input: string) {
    return `O campo ${input} deve ser uma Number.`
  }

  static generateErrorMessageInTypeStringOrRequired(input: string) {
    return {
      required_error: this.emptyInputError(input),
      invalid_type_error: this.stringInputError(input),
    }
  }

  static generateErrorMessageInTypeDateOrRequired(input: string) {
    return {
      required_error: this.emptyInputError(input),
      invalid_type_error: this.dateInputError(input),
    }
  }

  static generateErrorMessageInTypeNumberOrRequired(input: string) {
    return {
      required_error: this.emptyInputError(input),
      invalid_type_error: this.numberInputError(input),
    }
  }

  static messageResponseError(message: string) {
    return message
      .replace(`Validation error: `, '')
      .split(`;`)
      .map((message) => {
        const [mensagem] = message.split(`.`)
        return mensagem.trim()
      })
      .join(', ')
      .concat('.')
  }
}
