import React from 'react'
// import Topbar from './components/Topbar'
// import Righbar from './components/Righbar'
import $ from 'jquery';
import Home from './pages/home'
import {Routes,Route} from 'react-router-dom'
import Retrait from './pages/retrait'
import Login from './pages/login'
import Depot from './pages/depot'
import Transfert from './pages/transfert'
import ResetPassword from "./pages/ResetPassword";
import Print from './pages/print'
import Signup from './pages/signup'; 


function App() {
  return (

    <>
    {/* <Home /> */}

      <Routes>
        <Route path='/print' element={<Print/>}/>
        <Route path='/transfert' element={<Transfert/>}/>
        <Route path='/depot' element={<Depot/>}/>
        <Route path='/login' element={<Login />}  />
        <Route path='/' element={<Home />} />
        <Route path='/retrait/' element={<Retrait/>} />
        <Route path='/retrait/:id' element={<Retrait/>} />
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
      </Routes>
    </>

  )
}

export default App