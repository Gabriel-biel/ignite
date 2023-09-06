export class NameProduct {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(name: string) {
    return new NameProduct(name)
  }

  static createFromText(text: string) {
    const newName = text
      .normalize('NFKD')
      .trim()
      .toLowerCase() // Converter para minúsculas
      .replace(/ /g, '-') // Substituir espaços por hífens
      .replace(/[^a-z-]/g, '')

    return new NameProduct(newName)
  }
}
