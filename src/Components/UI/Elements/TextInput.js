import styled from "styled-components";

const TextInput = styled.input.attrs({
  type: "text",
  size: props => (props.small ? 4 : undefined)
})`
    border-radius: 0.125em;
     border:0.0625em solid #d9d9d9;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
     box-shadow:${props => (props.isShadow ? "" : "0 0.15em 0.3em #aaa")} ; 
    display: block;
    margin: 0 0 0.42rem 0;
     font-size:0.75rem;
    outline: none;
    width:${props => (props ? props.width : "100%")};
    height:${props => (false ? props.height : "1.88rem")};
    Left:${props => props.Left || "auto"}
    padding: 0 0 0 0.7em;
    border-right: ${props => (props.isRequired ? "0.1875em solid #ed260b" : "")};
    &:hover{
      box-shadow: 0 0.25em 0.62em #aaa;
      border: 0.0625em solid #1890ff;
      }
    ::placeholder {
      color: #bfbebb;
    }
    @media only screen and (max-width: 600px) {
    
      width:-webkit-fill-available;
  
         
       }
   `;
export default TextInput;
