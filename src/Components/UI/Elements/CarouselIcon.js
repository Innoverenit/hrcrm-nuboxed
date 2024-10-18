import React from 'react';
import styled from 'styled-components';
import { DashOutlined} from '@ant-design/icons';
const StyledIcon = styled(DashOutlined)`
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