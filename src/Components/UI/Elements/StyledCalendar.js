import styled from "styled-components";
import { Calendar } from 'react-big-calendar'

const StyledCalendar = styled(Calendar)`
    /* border-radius: 0.1875em;
    border: 0.0625em solid ${props => props.theme.borderColor};
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    display: block;
    margin: 0.3rem;
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor};
    padding: 0.3rem 1rem; */
    .rbc-calendar{
            border: 0.125em solid red !important;
            }

    .rbc-timeslot-group {
        border-bottom: 0.0625em solid tomato;
    }
   `
export default StyledCalendar;