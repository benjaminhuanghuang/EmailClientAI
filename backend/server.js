import express from "express"
import cors from "cors"

import { runEmailAgent } from "./emailAgent.js"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/agent", async (req, res) => {

  const { query } = req.body

  const result = await runEmailAgent(query)

  res.json(result)
})

app.listen(3001, () => {
  console.log("Agent server running")
})