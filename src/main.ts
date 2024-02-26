import express from 'express'
import { GOONIES } from './helpers/maps'
import LetterCollector from './classes/LetterCollector.class'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.get('/', (req, res) => {
  try {
    const collector = new LetterCollector(GOONIES)
    const result = collector.collectLetters()
    res.send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
