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
      {/* <h1 className='header'>Text Generator Using AI</h1>
      <div>
        welcome to text generator using AI
      </div>
      <div className='container'>
       
      <input type="text " placeholder='enter your text here' value={textinput} onChange={(e) => setinput(e.target.value)} />
      <button className='button-primary'>Generate text</button>
      </div> */}
      <FarewellApp/>
    </>
  )
}

export default App