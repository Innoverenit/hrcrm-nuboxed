import Menu from "antd/lib/menu";
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
    .ant-menu{
        padding: 0px;
        font-size: 12px;
        background-color: ${props => props.theme.backgroundColor};
        color: ${props => props.theme.color};
    }
`
export default StyledMenu;