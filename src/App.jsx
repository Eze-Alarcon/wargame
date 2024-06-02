import React, { useState, Suspense } from 'react'
import { Board } from './components/Board.jsx'
import { BaseButton } from './components/BaseButton.jsx'
import { AttackButton } from './components/AttackButton.jsx'
import { useBases } from './hooks/useBases.jsx'
import { useBoard } from './hooks/useBoard.jsx'

function App () {
  const [cpuGame, setCpuGame] = useState(true)
  const USER_BOARD = useBoard({ id: 1 })
  const CPU_BOARD = useBoard({ id: 2 })
  const { updateTotalBases, maxBasesReached, resetBases, decreaseBases } = useBases()
  function soloGame () {
    setCpuGame(true)
  }

  // const [gameMap, setGameMap] = useState([])

  // async function generateMap () {
  //   const newGameMap = await innitGame()
  //   setGameMap(newGameMap)
  // }

  async function restartGame (e) {
    e.preventDefault()
    // setGameMap([])
    resetBases()
  }

  // useEffect(() => {
  //   if (gameMap.length === 0) generateMap()
  // }, [gameMap])
  return (
    <main className='p-3 '>
      <section className="flex gap-8">
        <Suspense fallback={<p>Cargando mapa</p>} >
          {
            cpuGame
              ? <>
                <Board restartGame={restartGame}>
                  {
                    USER_BOARD.map((item, index) =>
                      <AttackButton
                        key={item.id}
                        item={item}
                        index={index}
                      />)
                  }
                </Board>
              </>
              : <button className='p-2 rounded-md bg-slate-300 hover:bg-slate-600' onClick={soloGame}>1 vs CPU</button>
          }
        </Suspense>
        <Suspense fallback={<p>Cargando mapa</p>} >
          {
            cpuGame &&
              <Board restartGame={restartGame}>
                {
                  CPU_BOARD.map((item, index) =>
                    <BaseButton
                      key={item.id}
                      id={item.id}
                      coordinate={item.coordinate}
                      index={index}
                      updateTotalBases={updateTotalBases}
                      maxBases={maxBasesReached}
                      decreaseBases={decreaseBases}
                    />)
                }
              </Board>
          }
        </Suspense>
      </section>
      {
        cpuGame &&
        <button
          type='button'
          className='mt-3 p-2 rounded-md border-2 bg-slate-300 hover:bg-slate-600'
          onClick={restartGame}>
          Restart
        </button>
      }
    </main>
  )
}

export default App
