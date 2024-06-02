import { useState } from 'react'
import { GAME_CONFIG } from '../../test/inputs.js'

const useBases = ({ initialBases }) => {
  const [totalBases, setTotalBases] = useState(initialBases)

  function maxBasesReached () {
    if (totalBases < GAME_CONFIG.MAX_BASES) {
      return false
    }
    return true
  }

  function resetBases () {
    setTotalBases(0)
  }

  function updateTotalBases () {
    setTotalBases(prevState => prevState + 1)
  }

  function decreaseBases () {
    setTotalBases(prevState => prevState - 1)
  }

  return {
    maxBasesReached,
    updateTotalBases,
    resetBases,
    decreaseBases
  }
}

export { useBases }
