import { useState } from 'react'
import './App.css'
import Left from './Components/Left'
import Right from './Components/Right'
import DogInfo from './Components/DogInfo'
import {Routes , Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex h-screen'>
        <Left/>
        <Routes>
          <Route path='/' element={<Right />} />
          <Route path='/dog/:dogId' element={<DogInfo />} />
        </Routes>
      </div>
    </>
  )
}

export default App



