import './App.css'
import React from 'react'
import Principal from './views/Principal'
import MatrizProvider from './contexts/MatrizContext'

function App() {
  return (
    <>
      <MatrizProvider>
        <Principal />
      </MatrizProvider>
    </>
  )
}

export default App
