import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updatePosition } from '../api/put.js'
import { GAME_CONFIG } from '../../test/inputs.js'

AttackButton.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}

function AttackButton ({ item, index }) {
  const {
    id,
    base,
    attacked,
    coordinate
  } = item

  const nextRow = index !== 0 && index % GAME_CONFIG.BOARD_SIZE === 0

  const [active, setActive] = useState(attacked)

  async function attackPosition (e) {
    e.preventDefault()

    if (e.currentTarget.diabled) { return }
    e.currentTarget.diabled = true
    setActive(true)

    // actualizar esto
    await updatePosition({ id: coordinate, idTablero: 1 })
  }

  return (
    <>
        { nextRow && <br/> }
        <button
          className={`h-10 w-10 p-1 border-2 hover:bg-gray-200 disabled:bg-red-300 ${base && 'bg-green-300'}`}
          disabled={active}
          onClick={attackPosition}
          id={id}
        >
          <p>{coordinate}</p>
        </button>
    </>
  )
}

export { AttackButton }
