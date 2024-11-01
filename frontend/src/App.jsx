import React from 'react'
import Sidebar from './components/Sidebar'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import ExplorePage from './pages/ExplorePage'
import LikesPage from './pages/LikesPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from "./context/AuthContext.jsx";

const App = () => {
  const { authUser, loading } = useAuthContext();
  if (loading) return null;
  
  return (
    <div className='flex text-white'>
      <Sidebar />
      <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
          <Route path='/signup' element={!authUser ? <Signuppage /> : <Navigate to="/" />} />
          <Route path='/explore' element={authUser ? <ExplorePage /> : <Navigate to="/login" />} />
          <Route path='/likes' element={authUser ? <LikesPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Toaster />

    </div>
  )
}

export default App