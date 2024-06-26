import React from 'react'
import './App.css'
import Signup from './pages/Signup'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import ListProperty from './pages/ListProperty'
import Profile from './pages/Profile'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/item/:itemId' element={<PropertyDetail />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/list-property' element={<ListProperty />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
