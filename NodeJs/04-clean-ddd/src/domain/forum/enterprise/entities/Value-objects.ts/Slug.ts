export class Slug {
  public value: string
  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it as a string.
   *
   * Example: "An example title" ==> "an-example-title"
   *
   * @param text
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // substituir qualquer espaço em branco por uma string vazia
      .replace(/[^\w-]+/g, '') // sustituir qualquer coisa qua não e uma, por uma string vazia
      .replace(/_/g, '-') // substituir qualquer _ por -
      .replace(/--+/g, '-') // substiuir onde houver -- por apenas um -
      .replace(/-$/g, '') // substituir o final da string -- por string vazia

    return new Slug(slugText)
  }
}
