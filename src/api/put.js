import { mapApiElement } from '../utils/utils.js'

async function updatePosition ({ id, idTablero }) {
  const updatedPosition = await fetch('http://localhost:3000/ataque/jugador', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tablero: 1,
      position: 'A3'
    })
  })
  const data = await updatedPosition.json()
  console.log(data)
  return data
}

async function placeBase ({ id, idTablero = 2 }) {
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

export {
  updatePosition,
  placeBase
}
