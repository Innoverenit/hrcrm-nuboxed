import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";


const StyledTimeinterval = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledSpan = styled.span`
  font-size: 1em;
  color: ${(props) => (props.isSelected ? "#1890ff" : props.theme.color)};
  margin: 0.2rem 0.3rem;
  font-weight: 600;
  font-family:poppins;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)}
  cursor:  ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  /* & :: after {
    content: " | ";
  } */
`;
            
{/* <div className=" font-poppins text-sm font-semibold " style={{color: `${(props) => (props.isSelected ? "#1890ff" : props.theme.color)}`, opacity: `${(props) => (props.disabled ? 0.3 : 1)}`,  cursor: ` ${(props) => (props.disabled ? "not-allowed" : "pointer")}`}} */}
class TimeInterval extends Component {
  render() {
    const { times, handleClick } = this.props;
    console.log(times);
    return (
      <StyledTimeinterval>
        {/* <h1> Hiring Stats</h1> */}
        {times &&
          times.length &&
          times
            // .filter(time => time.starter || subscriptionType === "PROFESSIONAL")
            .map((time, i) => {
              //////////debugger;

              //////////debugger;
              return (
                <StyledSpan
                  key={i}
                  isSelected={time.isSelected}
                  onClick={() => handleClick(time)}
                >
                  {time.value}
                </StyledSpan>
              );
            })}
            
      </StyledTimeinterval>
    );
  }
}

TimeInterval.propTypes = {
  times: PropTypes.array,
};
const mapStateToProps = ({ auth }) => ({});
export default connect(mapStateToProps)(TimeInterval);
