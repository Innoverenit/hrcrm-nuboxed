import { Creatable } from "react-select";
import styled from "styled-components";
const StyledCreatable1 = styled(Creatable)`
    flex: 1 1 0%;
    width: ${(props) => props.width || "auto"};
    height: 1.88rem;
    min-height:1.35rem;
.sales__control{
    height: 1.88rem;
    place-content: center;
    min-height:1.35em; 
    width: ${(props) => props.width || "auto"};
    border: 0.0625em solid ${(props) => props.theme.inputBorderColor};
    background-color: ${(props) => props.theme.backgroundColor};
    menuPlacement:${(props) => (props.menuPlacement ? "top" : "")}
    color: ${(props) => props.theme.color};
    border:0.01em ;
    outline: none;
    box-shadow:${(props) => (props.isShadow ? "" : "0em 0.01em 0.01em -0.01em ")} ; 
        border-radius: 0.01rem;
    Left:${(props) => props.Left || "auto"}
   &:hover{
    }
    ::placeholder {
      color: #bfbebb;
    }
    }
    .sales__placeholder{
        color: hsl(0,0%,50%);
        margin-left: 2px;
        margin-right: 2px;
        position: absolute;
       // top: 40%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        box-sizing: border-box;   
    }
    .sales__dropdown-indicator{
        padding: 0px 5px 3px;
        //align-self: normal;
    }
.sales__indicator-separator{
    align-self: stretch;
background-color: hsl(0, 0%, 80%);
margin-bottom: 8px;
margin-top: 8px;
width: 0.01px;
box-sizing: border-box;
}
    .sales__single-value{
       // top: 42%;
    }
.sales__menu{
    width: ${(props) => props.width || "100%"};
    height: 38;
    background-color:white
    font-size:0.75rem
    color: ${(props) => props.theme.color}
    outline: none;
    }
.sales__menu-list{
    color: ${(props) => props.theme.color};
    }
.sales__option{
    color: ${(props) => props.theme.color};
    &:hover{
        color: #222;
    }
   
`;
export default StyledCreatable1;
