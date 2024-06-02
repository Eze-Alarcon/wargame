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

export {
  updatePosition
}
