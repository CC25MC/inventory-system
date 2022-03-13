import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InventoryScreen from '../screens/InventoryScreen'
import ClientScreen from '../screens/ClientScreen'
import ProductScreen from '../screens/ProductScreen'
import SupplierScreen from '../screens/SupplierScreen'
import { useLocation } from '../Hooks'
export const AppRouter = () => {
  const { path } = useLocation()
  return (
    <Router>
      <Routes location={path}>
        <Route path="/" element={<InventoryScreen />} />
        <Route path="/client" element={<ClientScreen />} />
        <Route path="/product" element={<ProductScreen />} />
        <Route path="/supplier" element={<SupplierScreen />} />
      </Routes>
    </Router>
  )
}
