import DatePicker from "antd/lib/date-picker";
import styled from "styled-components";

const StyledRangePicker = styled(DatePicker.RangePicker)`
  .ant-input {
    height: 1.8125em;
    border: 0.0625em solid ${props => props.theme.inputBorderColor};
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    display: inline-flexbox;
    margin: 0.2rem 0;
    outline: none;
    padding: 0 1rem;
    .ant-calendar-range-picker-separator {
      vertical-align: inherit;
    }
  }
`;
export default StyledRangePicker;
