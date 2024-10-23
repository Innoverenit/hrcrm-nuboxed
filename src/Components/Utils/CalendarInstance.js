import React from "react";
import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(dayjs);
// import { StyledCalendar } from '../UI/Elements';

const StyledCalendar = styled(Calendar)`
  .rbc-time-content > * + * > * {
    border-left: 0.0625em solid ${props => props.theme.applicationBackground};
  }
  .rbc-timeslot-group {
    border-bottom: 0.0625em solid ${props => props.theme.applicationBackground};
  }
  .rbc-day-slot .rbc-time-slot {
    border-top: 0.0625em solid ${props => props.theme.applicationBackground};
  }
  .rbc-slot-selection {
    background-color: yellowgreen;
  }
  .rbc-day-slot .rbc-time-column .rbc-now .rbc-today {
    background-color: red;
  }
`;
const CalendarInstance = props => {
  console.log(props);
  return (
    <div style={{ height: props.height || "500px" }}>
      <StyledCalendar
        localizer={localizer}
        defaultView={props.defaultView || "week"}
        scrollToTime={new Date()}
        events={props.events ? props.events : []}
        defaultDate={props.defaultDate || new Date()}
        startAccessor={event => new Date(event.start)}
        endAccessor={event => new Date(event.end)}
        selectable={props.selectable || false}
        popup={props.popup || true}
        onSelecting={range => console.log(range)}
        onSelectEvent={props.onSelectEvent || null}
        onSelectSlot={range => {
          if (typeof props.onSelectSlot !== "undefined") {
            props.handleChooserModal(true);
            props.onSelectSlot(range);
          } else {
            props.handleChooserModal(true);
            console.log("no prop passed for onSelectSlot");
          }
        }}
        // onSelectEvent={props.onSelectEvent()}
        slotPropGetter={date => {
          // console.log(date)
        }}
        eventPropGetter={props.eventPropGetter}
      />
    </div>
  );
};
export default CalendarInstance;