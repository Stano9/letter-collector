import { isLetter } from '../helpers'

type Direction = 'up' | 'down' | 'left' | 'right'

export const collectLetters = (map: string[][]): { letters: string; path: string } => {
  const letters: string[] = []
  const path: string[] = []
  let currentLocation: [number, number] = [0, 0]
  let currentDirection: Direction = 'right'

  const move = (direction: Direction) => {
    switch (direction) {
      case 'up':
        currentLocation[0]--
        break
      case 'down':
        currentLocation[0]++
        break
      case 'left':
        currentLocation[1]--
        break
      case 'right':
        currentLocation[1]++
        break
    }
  }
  const isIntersection = (char: string) => {
    return char === '+' || /^[A-Z]$/.test(char)
  }

  const isValidTurn = (char: string) => {
    // Char is not visited and char is not starting point
    return (
      (/^[A-Z]$/.test(char) && char !== '@') ||
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
    } else {
      return false
    }
  }

  const getCharAtLocation = (): string => {
    const [row, col] = currentLocation
    if (isOutOfBounds(currentLocation)) {
      throw new Error('Out of bounds')
    }
    return map[row][col]
  }

  const markVisited = () => {
    const [row, col] = currentLocation
    map[row][col] = isLetter(map[row][col]) ? map[row][col].toLowerCase() : ' '
  }
  const intersectionTurn = (): Direction => {
    const [row, col] = currentLocation

    const up = row - 1 >= 0 ? map[row - 1][col] : null
    const down = row + 1 < map.length ? map[row + 1][col] : null
    const left = col - 1 >= 0 ? map[row][col - 1] : null
    const right = col + 1 < map[row].length ? map[row][col + 1] : null
    if (isValidTurn(up)) {
      return (currentDirection = 'up')
    } else if (isValidTurn(down)) {
      return (currentDirection = 'down')
    } else if (isValidTurn(left)) {
      return (currentDirection = 'left')
    } else if (isValidTurn(right)) {
      return (currentDirection = 'right')
    } else {
      console.log(up)
      console.log(letters)
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
    } else {
      throw new Error('Start position not found')
    }
  })()

  const advance = () => {
    const char = getCharAtLocation()
    path.push(char)
    if (isLetter(char)) {
      letters.push(char)
    }
    if (isEnd(char)) {
      return
    }
    markVisited()
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
