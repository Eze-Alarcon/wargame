import { newGame } from '../api/get'

async function innitGame () {
  // const savedMap = await getTable()
  // if (savedMap !== null) return savedMap
  const newMap = await newGame()
  return newMap
}

export {
  innitGame
}
