import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/products/Products'
import Categories from './pages/categories/Categories'
import EditCategory from './pages/categories/EditCategory'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/categories/:id' element={<EditCategory/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App