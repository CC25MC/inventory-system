import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import DashboardScreen from '../screens/DashboardScreen'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
      </Routes>
    </Router>
  )
}
