export class Cpf {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    return new Cpf(value)
  }

  /**
   * reciveis a string and normalize it as only number of cpf
   *
   * example: "000.111.222-80" => "00011122280"
   * @param text {string}
   */
  static createFromValue(cpf: string) {
    const cpfFromText = cpf
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '')
      .replace(/-/g, '')
      .replace(/--+/g, '')
      .replace(/-$/g, '')

    return new Cpf(cpfFromText)
  }
}
