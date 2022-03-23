import React from 'react'

const CalendarEvent = ({event}) => {
  const { title,user } = event
  return (
    <div>
      <span>{title}</span>
      <span>-{user.name}</span>
    </div>
  )
}

export default CalendarEvent
