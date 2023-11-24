import { expect, test } from 'vitest'
import { Cpf } from './cpf'

test('it should be able to create a new slug from text', () => {
  const cpf = Cpf.createFromValue('012.987.333-00')

  expect(cpf?.value).toEqual('01298733300')
})
