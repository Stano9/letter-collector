import { collectLetters } from 'src/services/collectLetters.service'
import { GOONIES } from 'src/helpers/maps'
describe('Goonies Map', () => {
  it('It should return GOONIES', async () => {
    const result = collectLetters(GOONIES)
    expect(result).toEqual({ letters: 'GOONIES', path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x' })
  })
})
