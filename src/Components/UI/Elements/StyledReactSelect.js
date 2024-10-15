import ReactSelect from "react-select";
import styled from "styled-components";
const StyledReactSelect = styled(ReactSelect)`
.sales__control{
    height: 1.88rem;
    place-content: center;
    min-height:1.35em; 
    margin: 0 0 0.42rem 0;
    width: ${(props) => props.width || "100%"};   
    border: 0.0625em solid #d9d9d9;
    background-color: ${(props) => props.theme.backgroundColor};
    menuPlacement:${(props) => (props.menuPlacement ? "top" : "")}
    color: ${(props) => props.theme.color};
     border-radius:  0.12rem;
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${(props) => props.theme.boxShadowColor};
   &:hover{
    box-shadow: 0em 0.25em 0.625em -0.125em  ${(props) => props.theme.boxShadowColor};
    }
    ::placeholder {
        color: #bfbebb;
      }
    }
    .sales__placeholder{
        color: #bfbebb;
        // top:auto;
    }
.sales__menu{
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${(props) => props.theme.boxShadowColor};
    }
    ::placeholder {
        color: #bfbebb;
      }
.sales__menu-list{
    color: ${(props) => props.theme.color};
    ::placeholder {
        color: #bfbebb;
      }
    }
.sales__option{
    color: ${(props) => props.theme.color};
    &:hover{
        color: #222;
    }
    ::placeholder {
        color: #bfbebb;
      }
    }

`;
export default StyledReactSelect;
