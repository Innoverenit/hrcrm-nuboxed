import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #80808091;
  width: 100%;
  height: 1.89em;
  margin: 0.3rem 0;
 // border: 0.0625em solid gainsboro;
  background-color: ${props => props.theme.backgroundColor};
 // border-radius: 0.3rem;
  // background: rgba(139, 148, 187, 0.8);
  padding: 0.2rem;
  padding-left: 1rem;
  font-size: 1rem;
  color:black
  transition: 0.3s all ease-in-out;
  &&:focus {
    // outline: none;
 //   border-radius: 0.3rem;
    // background: rgba(56, 66, 151, 0.555);
    color: black;
  }
  &&:active {
    // outline: none;
  //  border-radius: 0.3rem;
    // background: rgba(56, 66, 151, 0.555);
    color: #fff;
  }
`;
export default Input;
