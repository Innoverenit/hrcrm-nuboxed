import styled from 'styled-components';

const MainWrapper = styled.div`
    border-radius: 0.3rem;
    box-shadow: 0em 0.25em 0.625em -0.125em ${props => props.theme.boxShadowColor};
    border: 0.0625em solid ${props => props.theme.borderColor}
     background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    margin: 0.2rem;
    padding: 0.3rem;
    width: 100%;
    font-family:poppins;
    width: -moz-available;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    width: fill-available;
    overflow: auto;
`
export default MainWrapper;
{/* <div class="rounded border-[#0000001f]  border  shadow-[#a3abb980] border-solid text-black m-1 p-1 w-full font-poppins overflow-auto">  */}
                                      
