import express from 'express'
import { collectLetters } from './services/collectLetters.service'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.get('/', (req, res) => {
  const map = [
    ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
    [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
    [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
  ]
  const map2 = [
    [' ', ' ', '+', '-', 'O', '-', 'N', '+', ' ', ' ', ' '],
    [' ', ' ', '|', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' '],
    [' ', ' ', '|', ' ', ' ', '+', '-', 'I', '+', ' ', ' '],
    ['@', 'G', 'O', '-', '+', '|', ' ', '|', '|', ' ', ' '],
    [' ', ' ', '|', ' ', '|', '+', '-', '+', 'E', ' ', ' '],
    [' ', ' ', '+', '-', '+', ' ', ' ', ' ', 'S', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' '],
  ]
  try {
    const result = collectLetters(map2)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
