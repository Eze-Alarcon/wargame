import { useEffect, useState } from 'react'
import { useBoard } from './useBoard'
import { loadCpuGame } from '../api/put'
// hola! slldwkfmmos
const resetBoard = () => {
  const [reset, setReset] = useState(false)
  const { board: USER_BOARD, reloadBoard: reloadUserBoard } = useBoard({ id: 1 })
  const { board: CPU_BOARD, reloadBoard: reloadCpuBoard } = useBoard({ id: 2 })

  useEffect(() => {
    console.log('Aguante boca')
    if (reset) {
      loadCpuGame()
      reloadUserBoard()
      reloadCpuBoard()
      setReset(false)
    }
  }, [reset])

  function resetFunc () {
    setReset(true)
  }

  return {
    USER_BOARD,
    CPU_BOARD,
    resetFunc
  }
}

export { resetBoard }
