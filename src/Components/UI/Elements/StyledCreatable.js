import { Creatable } from "react-select";
import styled from "styled-components";
const StyledCreatable = styled(Creatable)`
    flex: 1 1 0%;
    width: ${(props) => props.width || "auto"};
    height: 1.88rem;
    min-height:1.35rem;
    box-shadow:${(props) => (props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa")} ; 
    margin-bottom:0.42rem;
    border-radius:2px;
.sales__control{
    height: 1.88rem;
    place-content: center;
    min-height:1.35em; 
    width: ${(props) => props.width || "auto"};
    border: 0.0625em solid ${(props) => props.theme.inputBorderColor};
    background-color: ${(props) => props.theme.backgroundColor};
    menuPlacement:${(props) => (props.menuPlacement ? "top" : "")}
    color: ${(props) => props.theme.color};
    border:0.0625em solid #d9d9d9;
    outline: none;
    box-shadow:${(props) => (props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa")} ; 
    Left:${(props) => props.Left || "auto"}
    margin:0 0 0.42rem 0;
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
    .sales__indicator-separator{
        // margin-top:0px
    }
    .sales__indicatorContainer{
        padding: 4px;
    }
    .sales__dropdown-indicator{
        padding: 0px 5px 3px;
        //align-self: normal;
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
export default StyledCreatable;
