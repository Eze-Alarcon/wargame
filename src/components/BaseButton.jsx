import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GAME_CONFIG } from '../../test/inputs'

BaseButton.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  updateTotalBases: PropTypes.func,
  maxBases: PropTypes.func,
  decreaseBases: PropTypes.func
}

function BaseButton ({ item, index, updateTotalBases, maxBases, decreaseBases }) {
  const [base, setBase] = useState(item.base)

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
          id={item.id}
        >
          <p>{item.coordinate}</p>
        </button>
    </>
  )
}

export { BaseButton }
