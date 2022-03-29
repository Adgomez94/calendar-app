import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/event'

const DeleteEventFab = () => {

  const dispatch = useDispatch()

  const handleInputChange = (e) =>{
    dispatch(eventDeleted())
  }

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleInputChange}
    >
      <i className='fa fa-trash'></i>
      <span>Borrar event</span>
    </button>
  )
}

export default DeleteEventFab