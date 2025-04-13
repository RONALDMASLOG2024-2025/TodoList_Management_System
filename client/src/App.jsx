import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  

  const [message, setMessage] = useState('')

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/hello`).then((res)=> setMessage(res.data.message)).catch((err)=>{
      console.error('Axios Error:', err)
      setMessage('Failed to fetch message')
    })
  }, [])

  return (
    <>
      <h1>{message}</h1>
      <p>HELLO Ron</p>
    </>
  )
}

export default App
