import { mapApiArr } from '../utils/utils'

async function newGame ({ id }) {
  const req = await fetch(`http://localhost:3000/tablero/obtener?numero=${id}`)
  const data = await req.json()
  return mapApiArr(data)
}

export { newGame }
