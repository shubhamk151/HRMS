import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HandleAuth from './pages/Auth/HandleAuth.jsx';
import EmpDashbord from './pages/Dashbord/EmpDashbord.jsx';
import React from 'react';

function App() {

  return (
    <>
      <Router>
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/auth" element={<HandleAuth />} />
          <Route path="/employees" element={<EmpDashbord />} />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </>
  )
}

export default App
