type Direction = 'up' | 'down' | 'left' | 'right'

class LetterCollector {
  map: string[][]
  letters: string[]
  path: string[]
  currentLocation: [number, number]
  currentDirection: Direction
  collected: boolean[][]

  constructor(input: string[][]) {
    this.map = structuredClone(input)
    this.letters = []
    this.path = []
    this.currentLocation = [0, 0]
    this.currentDirection = 'right'
    this.collected = new Array(this.map.length)
      .fill(false)
      .map(() => new Array(this.map[0].length).fill(false))
  }

  move(direction: Direction) {
    switch (direction) {
      case 'down':
        this.currentLocation[0]++
        break
      case 'right':
        this.currentLocation[1]++
        break
      case 'left':
        this.currentLocation[1]--
        break
      case 'up':
        this.currentLocation[0]--
        break
    }
  }

  isIntersection(char: string) {
    return char === '+' || /^[A-Z]$/.test(char)
  }

  isValidTurn(char: string, direction: Direction) {
    // Valid Turn
    if ((direction === 'right' || direction == 'left') && char === '|') return false
    if ((direction === 'up' || direction == 'down') && char === '-') return false

    return (
      (/^[A-Z]$/.test(char) && char !== '@' && char != ' ') ||
      char == '|' ||
      char == '+' ||
      char == '-' ||
      char == 'x'
    )
  }

  isEnd(char: string) {
    return char === 'x'
  }

  isOutOfBounds(location: [number, number]): boolean {
    const [row, col] = location
    if (row < 0 || row >= this.map.length || col < 0 || col >= this.map[row].length) {
      return true
    }
    return false
  }

  getCharAtLocation(): string {
    const [row, col] = this.currentLocation
    if (this.isOutOfBounds(this.currentLocation)) {
      throw new Error('Out of bounds')
    }
    return this.map[row][col]
  }

  markCollected(row: number, col: number) {
    // If Letter mark collected else clear path
    if (this.map[row][col].match(/[A-Z]/)) {
      this.collected[row][col] = true
    } else {
      this.map[row][col] = ' '
    }
  }

  intersectionTurn(): Direction {
    const [row, col] = this.currentLocation
    const turns = {
      right:
        col + 1 < this.map[row].length && this.currentDirection !== 'left'
          ? this.map[row][col + 1]
          : null,
      down:
        row + 1 < this.map.length && this.currentDirection !== 'up' ? this.map[row + 1][col] : null,
      left: col - 1 >= 0 && this.currentDirection !== 'right' ? this.map[row][col - 1] : null,
      up: row - 1 >= 0 && this.currentDirection !== 'down' ? this.map[row - 1][col] : null,
    }
    const turnPriority = [...new Set([this.currentDirection, ...Object.keys(turns)] as Direction[])]
    for (const i in turnPriority) {
      const turn = turns[turnPriority[i]]
      if (this.isValidTurn(turn, turnPriority[i])) {
        return (this.currentDirection = turnPriority[i])
      }
    }
    throw new Error('Invalid Intersection')
  }

  advance() {
    const char = this.getCharAtLocation()
    const [row, col] = this.currentLocation
    this.path.push(char)
    if (char.match(/[A-Z]/) && !this.collected[row][col]) {
      this.letters.push(char)
    }
    if (this.isEnd(char)) {
      return
    }
    this.markCollected(row, col)
    if (this.isIntersection(char)) {
      this.move(this.intersectionTurn())
    } else if (char !== ' ') {
      this.move(this.currentDirection)
    } else {
      throw new Error('Broken path')
    }
  }

  checkSpecificPosition(char: string) {
    let mentions = 0
    let position = null
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        if (this.map[row][col] === char) {
          position = [row, col]
          mentions++
        }
      }
    }
    if (mentions > 1) {
      throw new Error(`Multiple ${char} found`)
    }

    if (position) {
      return position
    }
    throw new Error(`Missing ${char}`)
  }

  collectLetters(): { letters: string; path: string } {
    this.checkSpecificPosition('x')
    const startPosition = this.checkSpecificPosition('@')
    this.currentLocation = startPosition
    while (this.getCharAtLocation() !== 'x') {
      try {
        this.advance()
      } catch (error) {
        throw new Error(error.message)
      }
    }
    if (this.isEnd(this.getCharAtLocation())) {
      this.path.push('x')
    }
    return {
      letters: this.letters.join(''),
      path: this.path.join(''),
    }
  }
}

export default LetterCollector
