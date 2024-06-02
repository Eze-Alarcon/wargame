import React, { useState, Suspense } from 'react'
import { Board } from './components/Board.jsx'
import { BaseButton } from './components/BaseButton.jsx'
import { AttackButton } from './components/AttackButton.jsx'
import { useBases } from './hooks/useBases.jsx'
import { useBoard } from './hooks/useBoard.jsx'

function App () {
  const [cpuGame, setCpuGame] = useState(true)
  const [basesSetup, setBasesSetup] = useState(false)
  const USER_BOARD = useBoard({ id: 1 })
  const CPU_BOARD = useBoard({ id: 2 })
  const initialBases = CPU_BOARD.reduce((count, item) => {
    return item.base === true ? count + 1 : count
  }, 0)
  const { updateTotalBases, maxBasesReached, resetBases, decreaseBases } = useBases({ initialBases })
  function soloGame () {
    setCpuGame(true)
  }

  async function restartGame (e) {
    e.preventDefault()
    resetBases()
  }

  function finishBases () {
    setBasesSetup(true)
    alert('Llego la hora de morir por tu pais!')
  }

  return (
    <main className='p-3 '>
      <section className="flex gap-8">
        <Suspense fallback={<h1>Cargando mapa</h1>}>
          {
            cpuGame && basesSetup && <>
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
          }
          {
            !cpuGame && <button className='p-2 rounded-md bg-slate-300 hover:bg-slate-600' onClick={soloGame}>1 vs CPU</button>
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
                      item={item}
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
      <aside className='flex gap-3'>
      {
        !basesSetup && <button className='mt-3 p-2 rounded-md border-2 bg-slate-300 hover:bg-slate-600' onClick={finishBases}>Iniciar partida</button>
      }
      {
        cpuGame &&
        <button
          type='button'
          className='mt-3 p-2 rounded-md border-2 bg-slate-300 hover:bg-slate-600'
          onClick={restartGame}>
            Restart
        </button>
      }
      </aside>
    </main>
  )
}

export default App
