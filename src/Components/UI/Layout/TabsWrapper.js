import styled from "styled-components";

const TabsWrapper = styled.div`
 border-radius: 0.3rem;
box-shadow: 0em 0.25em 0.625em -0.125em ;
border: 0.0625em solid ${props => props.theme.borderColor}
 background-color: ${props => props.theme.backgroundColor};
margin: 0.3rem;
// width:98%; 
height:91vh;
 scrollbar:thin;
`;
export default TabsWrapper;
