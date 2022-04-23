import Swal from 'sweetalert2'
import { fetchToken } from '../helpers/fetch'
import { prepareEvents } from '../helpers/prepareEvents'
import { types } from '../types/type'

export const eventStartAddNew = (event) => {
  return async(dispatch, getState) => {
    const {uid,name} = getState().auth
    try {
      const resp = await fetchToken('events', event, 'POST')
      const body = await resp.json()

      if(body.event.title) {
        event.id = body.event.id
        event.user = {
          id: uid,
          name: name
        }
        dispatch(eventAddNew(event))
      } 
    } catch (error) {
      console.log(error)
    }
  }
}

export const eventStartLoading = () => {
  return async(dispatch) => {
    try {
      const resp = await fetchToken('events')
      const body = await resp.json()
      
      const events = prepareEvents(body.events)
      dispatch(eventLoaded(events))
    } catch (error) {
      
    }
  }
}

export const eventStartUpdate = (event) => {
  return async(dispatch) =>{
    try {

      const resp = await fetchToken(`events/${event.uid}`, event, 'PUT')
      const body = await resp.json()
      if(body.event.uid) {
        dispatch(eventUpdated(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const eventStartDelete = () => {
  return async(dispatch, getState) =>{

    const {uid} = getState().calendar.activeEvent
    try {

      const resp = await fetchToken(`events/${uid}`, {} , 'DELETE')
      const body = await resp.json()
      if(body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActiveEvent =() =>({type: types.eventClearActiveEvent})

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event
})

const eventDeleted =() =>({type: types.eventDeleted})

const eventLoaded = (events) =>({
  type: types.eventLoaded,
  payload: events
})