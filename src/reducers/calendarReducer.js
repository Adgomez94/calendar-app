import moment from 'moment'
import { types } from '../types/type'

const initialState = {
  events: [
    {
      id: new Date().getTime(),
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

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map(ev => (ev.id === action.payload.id) ? action.payload : ev)
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(ev => ev.id !== state.activeEvent.id),
        activeEvent: null
      }
    default:
      return state
  }
}