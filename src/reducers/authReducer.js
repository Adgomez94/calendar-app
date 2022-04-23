import { types } from "../types/type"

const initialState = {
  checking: true,
  uid: null,
  name: ''

}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.authLogout:
      return {
        ...initialState,
        checking: false
      }

    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload,
      }

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      }
  
    default:
      return state
  }
}