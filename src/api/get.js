import { saveTable } from './post'

async function getTable () {
  return JSON.parse(localStorage.getItem('currentGame'))
}

async function newGame () {
  const req = await fetch('http://localhost:3000/tablero/obtener?numero=1')
  const data = await req.json()
  const newArr = data.map((item) => {
    return {
      coordinate: item.position,
      base: item.haveBase,
      attacked: item.hasAttacked,
      id: item._id
    }
  })
  saveTable(newArr)
  return newArr
}

export { newGame, getTable }
