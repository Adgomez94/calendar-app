import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate} from 'react-router-dom'

import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<CalendarScreen />} />
          <Route path="*" element={ <Navigate replace to="/" /> } />
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter
