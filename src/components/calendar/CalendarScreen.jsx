import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import Navbar from '../ui/Navbar'
import CalendarEvent from './CalendarEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

// para poner en español 
import { messages } from '../../helpers/calendar-messages-es'
import CalendarModal from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/event'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

moment.locale('es')

// const myEventsList = [{
//   id: new Date().getTime(),
//   title: 'Cumpleaños del jefe',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#fafafa',
//   notes:'Compro pastel',
//   user:{
//     _id:'123',
//     name:'Adrian'
//   }
// }]
// necesitamos usar el css que esta en la carpeta styles para que funcione correctamente
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

  
  const dispatch = useDispatch()
  
  const { events, activeEvent } = useSelector(state =>state.calendar)
  const { uid } = useSelector(state =>state.auth)
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])
  

  const onDoubleClick = (e) =>{
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) =>{
    dispatch(eventSetActive(e))
  }

  const onViewEvent = (view) =>{
    setLastView(view)
    localStorage.setItem('lastView', view)
  }

  const eventStyleGetter = (event, date ) =>{
    // damos estilos a lña tarjeta de evento
    return {
      backgroundColor: (uid === event.user.id) ? "#000" : "#465660",
      borRadius: '0px',
      opacity: 0.8,
      color: '#fff'
    }
  }

  const onSelectSlot = () =>{
    dispatch(eventClearActiveEvent())
  }

  return (
    <div>
      <Navbar />
      <Calendar
        className="class-screen"
        localizer={localizer}
        /* los mensajes */
        events={events}
        startAccessor="start"
        endAccessor="end"
        /* esto es para ponerlo en español */
        messages={messages}
        /* la acciones */
        eventPropGetter={eventStyleGetter}
        /* Los components que quieres poner en las tarjetas para personalizar */
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewEvent}
        /* la vista */
        view={lastView}
        /* Un evento cuando le das clic afuera nos da la informacion donde le demos clic*/
        onSelectSlot={onSelectSlot}
        selectable={true}
      />

      <AddNewFab />
      <CalendarModal />
      {
        activeEvent && <DeleteEventFab /> 
      }   
    </div>
  )
}

export default CalendarScreen
