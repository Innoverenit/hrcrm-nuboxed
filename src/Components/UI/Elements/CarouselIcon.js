import React from 'react';
import styled from 'styled-components';
import PowerInputIcon from '@mui/icons-material/PowerInput';
const StyledIcon = styled(PowerInputIcon)`
  position: absolute;
  top: ${props => props.top};
  background-color: #fff;
  color: #ccc;
  left: ${props => props.left || null};
  right: ${props => props.right || null};
  font-size: 1.875em;
  z-index: 2;
  border-radius: 50%;
`
export default function CarouselIcon(props) {
  return <StyledIcon {...props} />
}