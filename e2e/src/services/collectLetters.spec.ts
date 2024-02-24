import { collectLetters } from 'src/services/collectLetters.service'
import {
  AB,
  ACB1,
  ACB2,
  BLAH,
  GOONIES,
  MISSING_END,
  MISSING_START,
  MULTIPLE_STARTS,
} from 'src/helpers/maps'

describe('ACB1 Map', () => {
  it('Should return ACB', async () => {
    const result = collectLetters(ACB1)
    expect(result).toEqual({ letters: 'ACB', path: '@---A---+|C|+---+|+-B-x' })
  })
})
describe('ACB2 Map', () => {
  it('Should return ACB', async () => {
    const result = collectLetters(ACB2)
    expect(result).toEqual({ letters: 'ACB', path: '@---A---+|||C---+|+-B-x' })
  })
})
describe('Goonies Map', () => {
  it('Should return GOONIES', async () => {
    const result = collectLetters(GOONIES)
    expect(result).toEqual({ letters: 'GOONIES', path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x' })
  })
})

describe('Blah Map', () => {
  it('Should return BLAH', async () => {
    const result = collectLetters(BLAH)
    expect(result).toEqual({ letters: 'BLAH', path: '@B+++B|+-L-+A+++A-+Hx' })
  })
})

describe('AB Map', () => {
  it('Should return AB and ignore the stuff after the end of path(x)', async () => {
    const result = collectLetters(AB)
    expect(result).toEqual({ letters: 'AB', path: '@-A--+|+-B--x' })
  })
})

describe('Missing Start Map', () => {
  it('Should throw an error', async () => {
    expect(() => collectLetters(MISSING_START)).toThrow('Missing start character')
  })
})

describe('Missing End Map', () => {
  it('Should throw an error', async () => {
    expect(() => collectLetters(MISSING_END)).toThrow('Missing end character')
  })
})

describe('Multiple starts map', () => {
  it('Should throw an error', async () => {
    expect(() => collectLetters(MULTIPLE_STARTS)).toThrow('Multiple starts')
  })
})
