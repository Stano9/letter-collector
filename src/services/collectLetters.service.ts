import { isLetter } from '../helpers'

type Direction = 'up' | 'down' | 'left' | 'right'

export const collectLetters = (map: string[][]): { letters: string; path: string } => {
  const letters: string[] = []
  const path: string[] = []
  let currentLocation: [number, number] = [0, 0]
  let currentDirection: Direction = 'right'

  // Array map to track collected
  const collected: boolean[][] = new Array(map.length)
    .fill(false)
    .map(() => new Array(map[0].length).fill(false))

  const move = (direction: Direction) => {
    switch (direction) {
      case 'down':
        currentLocation[0]++
        break
      case 'right':
        currentLocation[1]++
        break
      case 'left':
        currentLocation[1]--
        break
      case 'up':
        currentLocation[0]--
        break
    }
  }
  const isIntersection = (char: string) => {
    return char === '+' || /^[A-Z]$/.test(char)
  }

  const isValidTurn = (char: string) => {
    // Valid Turn
    return (
      (/^[A-Z]$/.test(char) && char !== '@' && char != ' ') ||
      char == '|' ||
      char == '+' ||
      char == '-' ||
      char == 'x'
    )
  }

  const isEnd = (char: string) => {
    return char === 'x'
  }

  const isOutOfBounds = (location: [number, number]): boolean => {
    const [row, col] = location
    if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
      return true
    }
    return false
  }

  const getCharAtLocation = (): string => {
    const [row, col] = currentLocation
    if (isOutOfBounds(currentLocation)) {
      throw new Error('Out of bounds')
    }
    return map[row][col]
  }

  const markCollected = (row, col) => {
    // If Letter mark collected else clear path
    isLetter(map[row][col]) ? (collected[row][col] = true) : (map[row][col] = ' ')
  }
  const intersectionTurn = (): Direction => {
    const [row, col] = currentLocation
    const cameFrom = currentDirection

    const up = row - 1 >= 0 && cameFrom !== 'down' ? map[row - 1][col] : null
    const down = row + 1 < map.length && cameFrom !== 'up' ? map[row + 1][col] : null
    const left = col - 1 >= 0 && cameFrom !== 'right' ? map[row][col - 1] : null
    const right = col + 1 < map[row].length && cameFrom !== 'left' ? map[row][col + 1] : null

    if (isValidTurn(right) && right !== '|') {
      return (currentDirection = 'right')
    } else if (isValidTurn(up) && up !== '-') {
      return (currentDirection = 'up')
    } else if (isValidTurn(down) && down !== '-') {
      return (currentDirection = 'down')
    } else if (isValidTurn(left) && left !== '|') {
      return (currentDirection = 'left')
    } else {
      throw new Error('Invalid Intersection')
    }
  }

  ;((): void => {
    /* Find the Starting position */
    let foundStart: boolean,
      foundEnd = false
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === '@') {
          currentLocation = [row, col]
          foundStart = true
        }
        if (map[row][col] === 'x') {
          foundEnd = true
        }
      }
    }
    if (!foundEnd) {
      throw new Error('End position not found')
    }
    if (foundStart) {
      return
    }
    throw new Error('Start position not found')
  })()

  const advance = () => {
    const char = getCharAtLocation()
    const [row, col] = currentLocation
    path.push(char)
    if (isLetter(char) && !collected[row][col]) {
      letters.push(char)
    }
    if (isEnd(char)) {
      return
    }
    markCollected(row, col)
    if (isIntersection(char)) {
      move(intersectionTurn())
    } else {
      move(currentDirection)
    }
  }

  while (getCharAtLocation() !== 'x') {
    try {
      advance()
    } catch (error) {
      throw new Error(error.message)
    }
  }
  if (isEnd(getCharAtLocation())) {
    path.push('x')
  }
  return {
    letters: letters.join(''),
    path: path.join(''),
  }
}
