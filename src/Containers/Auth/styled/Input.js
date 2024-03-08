import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #80808091;
  width: 100%;
  height: 1.89em;
  margin: 0.3rem 0;
  background-color: ${props => props.theme.backgroundColor};
  padding: 0.2rem;
  padding-left: 1rem;
  font-size: 1rem;
  transition: 0.3s all ease-in-out;
  &&:focus {
    color: #add8e6;
  }
  &&:active {
    color: #72bcd4;
  }
`;
export default Input;
