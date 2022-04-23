import React, { useEffect } from 'react'

import moment from 'moment'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiClosedModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventUpdated, eventStartUpdate } from '../../actions/event';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours')
const nowPlus1 = now.clone().add(1,'hours')

const initialEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}
const CalendarModal = () => {

  const [dateStart, setDateStart] = useState(now.toDate())
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
  const [titileValid, setTitileValid] = useState(true)
  const [formValues, setFormValues] = useState(initialEvent)

  const dispatch = useDispatch()

  const { modalOpen } = useSelector(state=>state.ui)
  const { activeEvent } = useSelector(state=>state.calendar)

  const { title, notes, start, end } = formValues

  useEffect(() => {
    
    if(activeEvent) setFormValues(activeEvent)
    else setFormValues(initialEvent)
  }, [activeEvent, setFormValues])
  

  const handleInputChange = ({target}) =>{
    setFormValues({
      ...formValues,
      [target.name]:target.value
    })
  }

  const handleSubmitChange = (e) =>{
    e.preventDefault()

    const momentStart = moment( start )
    const momentEnd = moment( end )
    if( momentStart.isSameOrAfter( momentEnd ) ) {
      Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
      return 
    }
    if( title.trim().length < 2 ){
      return setTitileValid(false)
    }

    if( activeEvent ) {
      dispatch(eventStartUpdate(formValues))
    } else {
      dispatch(eventStartAddNew(formValues))
    }


    setTitileValid(true)
    closeModal()
  }
  const closeModal = () =>{
    dispatch(uiClosedModal())
    dispatch(eventClearActiveEvent())

    setFormValues(initialEvent)
  }

  const handleStartDateChange = (e) =>{
    setDateStart(e)
    setFormValues({
      ...formValues,
      start:e
    })
  }

  const handleEndDateChange = (e) =>{
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end:e
    })
  }
  return (
    <Modal
    isOpen={modalOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    closeTimeoutMS={200}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
  >
    <h1> {activeEvent ? 'Modificar Evento' : 'Nuevo Evento'} </h1>
<hr />
<form className="container" onSubmit={handleSubmitChange}>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker 
          className="form-control"
          onChange={handleStartDateChange} 
          value={ dateStart } />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker 
          className="form-control"
          minDate={dateStart}
          onChange={handleEndDateChange} 
          value={ dateEnd } />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${!titileValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={ title }
            onChange={ handleInputChange }
            autoComplete="off"
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
  </Modal>

  )
}

export default CalendarModal