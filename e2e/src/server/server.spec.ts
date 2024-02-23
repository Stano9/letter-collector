import { collectLetters } from 'src/services/collectLetters.service'
import { GOONIES } from 'src/helpers/maps'
describe('Goonies Map', () => {
  it('It should return GOONIES', async () => {
    const result = collectLetters(GOONIES)
    console.log(result)
    expect(result).toEqual({ letters: 'GOONIES', path: '@GO||+-O-N+|I|+-+|+-i+|ES|x' })
  })
})
