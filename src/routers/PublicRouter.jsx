import React from 'react'

import { Navigate, useLocation,} from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PublicRouter = ({
  children
}) => {
  const { uid } = useSelector(state => state.auth)
  const location = useLocation()

  if(!!uid) return (<Navigate to="/" state={{ from: location }} replace />)

  return children
}
