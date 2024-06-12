import React from 'react'
import Calculator from './components/Calculator'

const App = () => {
  return (
    <div className='app'>
      <Calculator/>
      <p className='developer'>
        Developed by <span>Prasad Abesinghe</span>
      </p>
    </div>
  )
}

export default App