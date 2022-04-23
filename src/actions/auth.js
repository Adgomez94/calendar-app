import Swal from "sweetalert2"
import { fetchNotToken, fetchToken } from "../helpers/fetch"
import { types } from "../types/type"


export const startLogin = (email, password) => {
  return async(dispatch) => {
    const resp = await fetchNotToken('users/', {email, password}, 'POST')
    const { token, name, uid, message } = await resp.json()

    if(!token) return Swal.fire('Error', message, 'error')

    localStorage.setItem('token', token)
    localStorage.setItem('token-init-date', new Date().getTime())
    dispatch(login({
      name,
      uid
    }))
  }
}

export const startRegister = (email, password, name) => {
  return async(dispatch) => {
    const resp = await fetchNotToken('users/new', { email, password, name }, 'POST')
    const { uid, message } = await resp.json()

    if(!uid) return Swal.fire('Error', message, 'error')

    dispatch(startLogin(email, password))
  }
}

export const startChecking = () => {
  return async(dispatch) => {

    const resp = await fetchToken('users/renew')
    const {token, name, uid, message} = await resp.json()

   if(!uid) {
    dispatch(checkingFinish()) 
    return Swal.fire('Error', message, 'error')
   } 


    localStorage.setItem('token', token)
    localStorage.setItem('token-init-date', new Date().getTime())
    dispatch(login({uid, name}))
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(logout())
  }
} 

const checkingFinish = () =>({type: types.authCheckingFinish})

const logout = () => ({type: types.authLogout})