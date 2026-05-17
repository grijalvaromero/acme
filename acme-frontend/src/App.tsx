import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './views/Home'
import Contacto from './views/Contacto'
import Login from './views/Login'
import Details from './views/Details'
import Cart from './views/Cart'
import Checkout from './views/Checkout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  //npm install @paypal/react-paypal-js
  return (
   <BrowserRouter>
    <Routes>
        <Route element={<Layout />}>
            <Route  path='/' element={<Home /> } />
            <Route  path='/detalles/:slug' element={<Details /> } />
            <Route  path='/carrito' element={<Cart /> } />
            <Route  path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute> } />
            <Route  path='/contacto' element={<Contacto /> } />
        </Route>

        <Route  path='/login' element={<Login /> } />
    </Routes>
    
   </BrowserRouter>
  )
}

export default App
