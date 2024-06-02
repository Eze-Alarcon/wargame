import { mapApiElement, loadBases } from '../utils/utils.js'

async function updatePosition ({ id, idTablero }) {
  console.log(id)
  const updatedPosition = await fetch('http://localhost:3000/ataque/jugador', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tablero: idTablero,
      position: id
    })
  })
  const data = await updatedPosition.json()
  console.log(data)
  return data
}

async function placeBase ({ id, idTablero = 1 }) {
  const updatedPosition = await fetch('http://localhost:3000/tablero/cambiarBase', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tablero: idTablero,
      position: id
    })
  })
  const data = await updatedPosition.json()
  return mapApiElement(data)
}

async function cpuBases () {
  const bases = loadBases()
  const requests = bases.map((position) => placeBase({ idTablero: 2, id: position }))
  try {
    const results = await Promise.all(requests)
    console.log('All bases placed:', results)
  } catch (error) {
    console.error('Error placing bases:', error)
  }
}

export {
  updatePosition,
  placeBase,
  cpuBases
}
