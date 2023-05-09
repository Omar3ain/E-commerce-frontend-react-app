import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import pages from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/user/login';

function App() {
  const [count, setCount] = useState(0)

console.log(pages);
  return (
    <>
    <BrowserRouter>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<pages.HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    {/* <pages.HomePage/> */}
    </>
  )
}

export default App
