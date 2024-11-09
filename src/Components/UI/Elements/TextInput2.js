import styled from "styled-components";

const TextInput2 = styled.input.attrs({
  type: "text",
  size: props => (props.small ? 4 : undefined)
})`
    border-radius: 0.125em;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
      box-shadow:${(props) => (props.isShadow ? "" : "0em 0.01em 0.01em -0.01em ")} ; 
    display: block;
    margin: 0 0 0.42rem 0;
     font-size:0.75rem;
    outline: none;
    width:${props => (props ? props.width : "100%")};
    height:${props => (false ? props.height : "1.88rem")};
    Left:${props => props.Left || "auto"}
    padding: 0 0 0 0.7em;
        border-radius: 0.01rem;
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
export default TextInput2;
