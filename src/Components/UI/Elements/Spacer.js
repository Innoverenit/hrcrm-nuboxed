import React from "react";
import styled from "styled-components";

const Space = styled.div`
  margin: ${props => props.marginTop || "0.85rem"} 0em;
`;
export default function Spacer(props) {
  return <Space {...props} />;
}
