import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import FarewellApp from './farewell'
import './App.css'
function App() {
 const[textinput, setinput]=useState()
//  useEffect(()=>{
//      console.log(textinput)

//  })();


  return (
    <>
     
      <FarewellApp/>
    </>
  )
}

export default App