import React, { useState, Suspense } from 'react'
import { useBases } from './hooks/useBases.jsx'
import { Board } from './components/Board.jsx'
import { useBoard } from './hooks/useBoard.jsx'
import { BaseButton } from './components/BaseButton.jsx'
import { AttackButton } from './components/AttackButton.jsx'

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
      <section className="flex gap-16">
        <div className='flex flex-col gap-8'>
          <p>TABLERO 1 (USUARIO)</p>
            <Suspense fallback={<h1>Cargando mapa</h1>}>
            {
              cpuGame && basesSetup && <>
                <Board restartGame={restartGame}>
                  <p>Usuario Ataque</p>
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
                <>
                  <Board restartGame={restartGame}>
                    <p>Usuario Bases</p>
                    {
                      USER_BOARD.map((item, index) =>
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
                </>
            }
          </Suspense>
        </div>

        <div className='flex flex-col gap-8'>
            <h1>TABLERO 2 (CPU)</h1>
            <Suspense fallback={<p>Cargando mapa</p>} >
            {
              cpuGame &&
                <Board restartGame={restartGame}>
                <p>CPU bases</p>
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

          <Suspense fallback={<h1>Cargando mapa</h1>}>
          {
            cpuGame && basesSetup && <>
              <Board restartGame={restartGame}>
                <p>CPU ataque</p>
                  {
                    CPU_BOARD.map((item, index) =>
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
            !cpuGame &&
              <button className='p-2 rounded-md bg-slate-300 hover:bg-slate-600' onClick={soloGame}>1 vs CPU</button>
          }
          </Suspense>
          </div>
        {/* <UserComponents
          cpuGame={cpuGame}
          basesSetup={basesSetup}
          restartGame={restartGame}
          USER_BOARD={USER_BOARD}
          updateTotalBases={updateTotalBases}
          maxBasesReached={maxBasesReached}
          decreaseBases={decreaseBases}
          soloGame={soloGame}
        />

        {
          basesSetup && <CpuComponents
          cpuGame={cpuGame}
          basesSetup={basesSetup}
          restartGame={restartGame}
          CPU_BOARD={CPU_BOARD}
          updateTotalBases={updateTotalBases}
          maxBasesReached={maxBasesReached}
          decreaseBases={decreaseBases}
          soloGame={soloGame}
        />
        } */}

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
          >
            Restart
        </button>
      }
      </aside>
    </main>
  )
}

export default App
