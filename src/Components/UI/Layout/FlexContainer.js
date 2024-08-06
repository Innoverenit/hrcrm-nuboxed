import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || "row"};
  flex-wrap: ${props => props.flexWrap || "wrap"};
  align-items: ${props => props.alignItems || "flex-start"};
  align-self: ${props => props.alignSelf || "flex-start"};
  justify-content: ${props => props.justifyContent || "flex-start"};
  flex-grow: ${props => props.flexGrow || 1};
  flex-shrink: ${props => props.flexShrink || 1};
  flex-basis: ${props => props.flexBasis || "auto"};
  height: ${props => props.height || "auto"};
  margin-right: ${props => props.marginRight || "auto"};
  margin-top: ${props => props.marginTop || ""};

  @media only screen and (max-width: 37.5em) {
    
//  flex-direction:column;
    
  }
`;
export default FlexContainer;


// <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">