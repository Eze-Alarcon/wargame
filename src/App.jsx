import { useState } from "react"
import example from "../test/test.json"
import {board_config} from "../test/inputs.js"

function Button({children, base, attacked, nextRow = false}) {
  const [active, setActive] = useState(attacked)
  
  function disableBtn(e) {
    e.preventDefault()
    if (e.currentTarget.diabled)
      return
    e.currentTarget.diabled = true
    setActive(true)
  }

  return (
    <>
        { nextRow && <br/> }
        <button
          className={`h-10 w-10 p-1 border-2 hover:bg-gray-200 disabled:bg-red-300 ${base && 'bg-green-300'}`}
          disabled={active}
          onClick={disableBtn}
        >
          {children}
        </button>
    </>
  )
}

function Board() {
  return (
    <>
      { 
        example.map((item, index) => 
          <Button
          key={item.id}
          base={item.base}
          attacked={item.attacked}
          nextRow={index != 0 && index % board_config.board_cols == 0}
        >
          <p>{item.coordinate}</p>
        </Button>)  
      }
    </>
  )
}

function App() {
  return (
    <>
      <section className="p-3">
        { Board() }
      </section>
    </>
  )
}

export default App
