import LetterCollector from 'src/classes/LetterCollector.class'
import {
  AB,
  ACB1,
  ACB2,
  BLAH,
  BROKEN_PATH,
  GOONIES,
  MISSING_END,
  MISSING_START,
  MULTIPLE_ENDS,
  MULTIPLE_STARTS,
} from 'src/helpers/maps'

describe('Example maps', () => {
  it('Should return ACB', async () => {
    const collector = new LetterCollector(ACB1)
    const result = collector.collectLetters()
    expect(result).toEqual({ letters: 'ACB', path: '@---A---+|C|+---+|+-B-x' })
  })
  it('Should return ACB', async () => {
    const collector = new LetterCollector(ACB2)
    const result = collector.collectLetters()
    expect(result).toEqual({ letters: 'ACB', path: '@---A---+|||C---+|+-B-x' })
  })
  it('Should return GOONIES', async () => {
    const collector = new LetterCollector(GOONIES)
    const result = collector.collectLetters()
    expect(result).toEqual({ letters: 'GOONIES', path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x' })
  })

  it('Should return BLAH', async () => {
    const collector = new LetterCollector(BLAH)
    const result = collector.collectLetters()
    expect(result).toEqual({ letters: 'BLAH', path: '@B+++B|+-L-+A+++A-+Hx' })
  })
  it('Should return AB and ignore the stuff after the end of path(x)', async () => {
    const collector = new LetterCollector(AB)
    const result = collector.collectLetters()
    expect(result).toEqual({ letters: 'AB', path: '@-A--+|+-B--x' })
  })
  it('Should throw an error', async () => {
    const collector = new LetterCollector(MISSING_START)
    expect(() => collector.collectLetters()).toThrow('Missing @')
  })
  it('Should throw an error', async () => {
    const collector = new LetterCollector(MISSING_END)
    expect(() => collector.collectLetters()).toThrow('Missing x')
  })
  it('Should throw an error', async () => {
    const collector = new LetterCollector(MULTIPLE_STARTS)
    expect(() => collector.collectLetters()).toThrow('Multiple @ found')
  })
  it('Should throw an error', async () => {
    const collector = new LetterCollector(MULTIPLE_ENDS)
    expect(() => collector.collectLetters()).toThrow('Multiple x found')
  })
  it('Should throw an error', async () => {
    const collector = new LetterCollector(BROKEN_PATH)
    expect(() => collector.collectLetters()).toThrow('Broken path')
  })
})

describe('LetterCollector', () => {
  describe('move', () => {
    it('should move down', () => {
      const letterCollector = new LetterCollector([['@']])
      letterCollector.move('down')
      expect(letterCollector.currentLocation).toEqual([1, 0])
    })

    it('should move right', () => {
      const letterCollector = new LetterCollector([['@']])
      letterCollector.move('right')
      expect(letterCollector.currentLocation).toEqual([0, 1])
    })

    it('should move left', () => {
      const letterCollector = new LetterCollector([['@']])
      letterCollector.move('left')
      expect(letterCollector.currentLocation).toEqual([0, -1])
    })

    it('should move up', () => {
      const letterCollector = new LetterCollector([['@']])
      letterCollector.move('up')
      expect(letterCollector.currentLocation).toEqual([-1, 0])
    })
  })

  describe('isIntersection', () => {
    it('should return true for "+"', () => {
      const letterCollector = new LetterCollector([['+']])
      expect(letterCollector.isIntersection('+')).toBe(true)
    })

    it('should return true for "A"', () => {
      const letterCollector = new LetterCollector([['A']])
      expect(letterCollector.isIntersection('A')).toBe(true)
    })

    it('should return false for " "', () => {
      const letterCollector = new LetterCollector([[' ']])
      expect(letterCollector.isIntersection(' ')).toBe(false)
    })
  })

  describe('isValidTurn', () => {
    it('should return true for "A" and "right"', () => {
      const letterCollector = new LetterCollector([['A']])
      expect(letterCollector.isValidTurn('A', 'right')).toBe(true)
    })

    it('should return false for "|" and "right"', () => {
      const letterCollector = new LetterCollector([['|']])
      expect(letterCollector.isValidTurn('|', 'right')).toBe(false)
    })

    it('should return true for "x" and "right"', () => {
      const letterCollector = new LetterCollector([['x']])
      expect(letterCollector.isValidTurn('x', 'right')).toBe(true)
    })
  })

  describe('isOutOfBounds', () => {
    it('should return true for [-1, 0]', () => {
      const letterCollector = new LetterCollector([['@']])
      expect(letterCollector.isOutOfBounds([-1, 0])).toBe(true)
    })

    it('should return true for [1, 0]', () => {
      const letterCollector = new LetterCollector([['@']])
      expect(letterCollector.isOutOfBounds([1, 0])).toBe(true)
    })

    it('should return true for [0, -1]', () => {
      const letterCollector = new LetterCollector([['@']])
      expect(letterCollector.isOutOfBounds([0, -1])).toBe(true)
    })

    it('should return true for [0, 1]', () => {
      const letterCollector = new LetterCollector([['@']])
      expect(letterCollector.isOutOfBounds([0, 1])).toBe(true)
    })

    it('should return false for [0, 0]', () => {
      const letterCollector = new LetterCollector([['@']])
      expect(letterCollector.isOutOfBounds([0, 0])).toBe(false)
    })
  })

  describe('checkSpecificPosition', () => {
    it('should return [0, 0] for "@"', () => {
      const letterCollector = new LetterCollector([['@']])
      expect(letterCollector.checkSpecificPosition('@')).toEqual([0, 0])
    })

    it('should throw an error for multiple "@"', () => {
      const letterCollector = new LetterCollector([['@', '@']])
      expect(() => letterCollector.checkSpecificPosition('@')).toThrow('Multiple @ found')
    })

    it('should throw an error for missing "@"', () => {
      const letterCollector = new LetterCollector([[' ']])
      expect(() => letterCollector.checkSpecificPosition('@')).toThrow('Missing @')
    })
  })

  describe('Advancing the current location based on the current direction', () => {
    it('should prioritize the current direction from the momentum', () => {
      const letterCollector = new LetterCollector(GOONIES)
      const res = letterCollector.collectLetters()
      const pathMap = res.path.split('')
      /* @-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x
      The 5th character should be - because it needs to keep moving right
      and the 24th character should be | beacuse after "I" needs to keep moving down */
      expect(pathMap[5]).toEqual('-')
      expect(pathMap[24]).toEqual('|')
    })
  })
})
