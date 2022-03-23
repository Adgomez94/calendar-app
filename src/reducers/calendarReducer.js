import moment from 'moment'
import { types } from '../types/type'

const initialState = {
  events: [
    {
      title: 'Cumpleaños del sammy',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes:'Compro pastel',
      user:{
        _id:'123',
        name:'Adrian'
      }
    }
  ],
  activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null
      }
    default:
      return state
  }
}