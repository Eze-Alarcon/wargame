import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GAME_CONFIG } from '../../test/inputs'

BaseButton.propTypes = {
  id: PropTypes.string,
  coordinate: PropTypes.string,
  index: PropTypes.number,
  updateTotalBases: PropTypes.func,
  maxBases: PropTypes.func,
  decreaseBases: PropTypes.func
}

function BaseButton ({ id, coordinate, index, updateTotalBases, maxBases, decreaseBases }) {
  const [base, setBase] = useState(false)

  const nextRow = index !== 0 && index % GAME_CONFIG.BOARD_SIZE === 0

  async function placeBase (e) {
    e.preventDefault()

    if (base) {
      setBase(false)
      decreaseBases()
      return
    }

    if (maxBases()) { return }

    setBase(true)
    updateTotalBases()
  }

  return (
    <>
        { nextRow && <br/> }
        <button
          className={`h-10 w-10 p-1 border-2 ${!base ? 'hover:bg-green-300 bg-none' : 'bg-green-500'}`}
          onClick={placeBase}
          id={id}
        >
          <p>{coordinate}</p>
        </button>
    </>
  )
}

export { BaseButton }
