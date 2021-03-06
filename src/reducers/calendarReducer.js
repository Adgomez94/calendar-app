
import { types } from '../types/type'

// {
//   id: new Date().getTime(),
//   title: 'Cumpleaños del sammy',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#fafafa',
//   notes:'Compro pastel',
//   user:{
//     _id:'123',
//     name:'Adrian'
//   }
// }

const initialState = {
  events: [],
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
      console.log(state.events, action.payload)
      return {
        ...state,
        events: state.events.map(ev => (ev.uid === action.payload.uid) ? action.payload : ev)
      }

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload]
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(ev => ev.uid !== state.activeEvent.uid),
        activeEvent: null
      }
    default:
      return state
  }
}