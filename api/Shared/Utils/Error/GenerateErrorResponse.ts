export default class GenerateErrorResponse {
  static emptyInputError(input: string) {
    return `O campo ${input} está vazio.`;
  }

  static minInputError(input: string, min: number) {
    return `O campo ${input} deve ter no mínimo ${min} caracteres.`;
  }
  static stringInputError(input: string) {
    return `O campo ${input} deve ser uma String.`;
  }
  static emailInputError() {
    return `Email inválido.`;
  }
}
