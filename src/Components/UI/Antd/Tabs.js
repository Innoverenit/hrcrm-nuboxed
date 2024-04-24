import Tabs from "antd/lib/tabs";
import styled from "styled-components";

const StyledTabs = styled(Tabs)`
    .ant-tabs-nav-container {
        color: ${props => props.theme.color};
    }
    .ant-tabs-bar {
        margin: 0.3rem;
    }
    .ant-nav-container {
        color: ${props => props.theme.color};
        box-shadow: 0 0.0625em 0.25em 0.0625em ${props => props.theme.boxShadowColor};
        border: 0.0625em solid ${props => props.theme.borderColor}
    }
   
    
`;
export default StyledTabs;
