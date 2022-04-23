import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRouter = ({
  children
}) => {
  const { uid } = useSelector(state => state.auth)

  const location = useLocation()
  if(!uid) return (<Navigate to="/login" state={{ from: location }} replace />)

  return children
}
