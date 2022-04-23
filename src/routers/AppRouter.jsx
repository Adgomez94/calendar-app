import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate} from 'react-router-dom'
import { startChecking } from '../actions/auth'

import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

const AppRouter = () => {

  const { checking } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( startChecking() )
  
  }, [dispatch])
  
  if(checking) return (<h5>Espere por Favor...</h5>)
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" 
          element={
            <PublicRouter>
              <LoginScreen />
            </PublicRouter>
          } 
          />
          <Route path="/" 
          element={
            <PrivateRouter>
              <CalendarScreen />
            </PrivateRouter>
          } />
          <Route path="*" element={ <Navigate replace to="/" /> } />
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter
