import { AsyncCreatable } from "react-select";
import styled from "styled-components";
const StyledCreatable = styled(AsyncCreatable)`
    flex: 1 1;
.sales__control{
    width:${(props) => (props ? props.width : "25em")};
    height: 1.88rem;
    place-content: center;
    min-height:1.35rem; 
    border:0.0625em solid #d9d9d9;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    border-radius: 0.12rem;
    outline: none;
       margin:0 0 0.42rem 0;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${(props) => props.theme.boxShadowColor};
    border-right: ${(props) => (props.isRequired ? "0.1875em solid #ed260b" : "")};
   &:hover{
    box-shadow: 0em 0.25em 0.625em -0.125em  ${(props) => props.theme.boxShadowColor};
    }
    ::placeholder {
      color: #888;
    }
    }
    .sales__placeholder{
        color: #bfbebb;
        //top:auto;
    }
.sales__menu{
    background-color: ${(props) => props.theme.applicationBackground};
    color: ${(props) => props.theme.color};
    border-radius: 0.12rem;
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${(props) => props.theme.boxShadowColor};
    }
.sales__menu-list{
    color: ${(props) => props.theme.color};
    border-radius: 0.12rem;
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${(props) => props.theme.boxShadowColor}; */
    }
.sales__option{
    color: ${(props) => props.theme.color};
    &:hover{
        color: #222;
    }
    }

`;
export default StyledCreatable;
