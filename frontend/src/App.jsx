import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
