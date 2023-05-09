import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import pages from './pages';
function App() {
  const [count, setCount] = useState(0)

console.log(pages);
  return (
    <>
    <pages.HomePage/>
    </>
  )
}

export default App
