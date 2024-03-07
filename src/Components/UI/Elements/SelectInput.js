import styled from "styled-components";
import { StyledSelect } from "../Antd";
const SelectInput = styled(StyledSelect)`
  .ant-input{
      background-color: ${props => props.theme.backgroundColor};
      color: ${props => props.theme.color};
      margin: 0 0 0.42rem 0;
      width:21.875em;
      outline: none;
      border-radius:0.125rem;
      box-shadow:${props => (props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa")} ; 
       height:1.48rem;
      border-right: ${props =>
    props.isRequired ? "0.1875em solid #ed260b" : ""} !important;
    &:hover{
      }
      ::placeholder {
        color: #888;
      }
      ::placeholder {
        color: #bfbebb;
      }
  }
  .ant-select-selection {
    height: 1.48rem;
  }
   `;
export default SelectInput;
