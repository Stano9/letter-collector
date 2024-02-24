import express from 'express'
import { collectLetters } from './services/collectLetters.service'
import { ACB, BLAH, GOONIES } from './helpers/maps'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.get('/', (req, res) => {
  try {
    const result = collectLetters(GOONIES)
    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
