import styled from 'styled-components';

const OnlyWrapCard = styled.div`
    border-radius: 0.4rem;
   
 box-shadow: 4px 0px 9px 3px rgba(163, 171, 185, 0.5);
    border: none;
    background: #FFFFFF;
    color: ${props => props.theme.color};
    margin: 1.2rem;
    padding: 0.5rem;
    width: 100%;
    width: -moz-available;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    width: fill-available;
    overflow: auto;
`  
// className=" overflow-auto w-wk p-2 m-5 shadow-[4px 0px 9px 3px rgba(163, 171, 185, 0.5)] rounded bg-white"
export default OnlyWrapCard;

