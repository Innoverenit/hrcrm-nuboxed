import styled from "styled-components";

const TabsWrapper1 = styled.div`
width: '100%'
 border-radius: 0.3rem;
 box-shadow: 0em 0.25em 0.625em -0.125em ;
// box-shadow: 0em 0.25em 0.625em -0.125em ${props => props.theme.boxShadowColor};
border: 0.0625em solid ${props => props.theme.borderColor}
 background-color: ${props => props.theme.backgroundColor};
color: ${props => props.theme.color};
margin: 0.3rem;
width:98%; 
padding: 0.3rem;
height:13rem;
/* overflow: auto; */
@media only screen and (max-width: 600px) {
   
    height: 17rem;

    
  }
`;
export default TabsWrapper1;
