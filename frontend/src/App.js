// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // Correct path to your ProtectedRoute component
import Home from './pages/home';
import Retrait from './pages/retrait';
import Login from './pages/login';
import Depot from './pages/depot';
import Transfert from './pages/transfert';
import LoginAdmin from './pages/loginAdmin';
import ResetPassword from './pages/ResetPassword';
import Print from './pages/print';
import Signup from './pages/auth';
import LoginCompta from './pages/loginCompta';

import { useSelector } from 'react-redux';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
       <Route element={<ProtectedRoute/>}>
         <Route  element={<Print />} path="/print" />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginCompta" element={<LoginCompta />} />

          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/depot" element={<Depot />} />
          <Route path="/transfert" element={<Transfert />} />
          <Route path="/retrait" element={<Retrait />} />
          <Route path="/retrait/:id" element={<Retrait />} />
       </Route>
    </Routes>
  );
}

export default App;
