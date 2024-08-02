import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
class OpportunityJumpstartBox extends Component {
  
  render() {
    return (
       <FlexContainer flexDirection="row" style={{ width: "100%"}}>
        <FlexContainer style={{ width: "100%"}}>
        
          <JumpStartBox
            noProgress
            title="# Requirements"
          />
       
          <JumpStartBox
            noProgress
            title="# Positions "
          />
          
        </FlexContainer>
        <FlexContainer style={{ width: "100%"}}>
        <JumpStartBox
            noProgress
            title="# Selected"
            
          />
          <JumpStartBox
            noProgress
            title="# OnBoarded"
          />
        </FlexContainer>
        </FlexContainer>
      
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityJumpstartBox);

const MainWrapper = styled.div`
  /* */
  margin: 0px 20px;
  @media only screen and (max-width: 600px) {
  }
`;

const CardElement = styled.div`
  //   width: 20%;
  border-radius: 0.2rem;
  border: 2px solid #eeeeee;
  background-color: white;
  height: auto;
  color: black;
  margin: 0.3rem;
  padding: 0.3rem;
  width: 15vw;

  //   padding: 0 20px;
  margin-top: 0.5em;
  /* margin:0px 20px; */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const CardDescription = styled.div`
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const CardImage = styled.div`
  width: 200;
  display: flex;
  height: 200 @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const WithOutImage = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction:column @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;


const Desc = styled.p`
  height: 0px;
`;
const Price = styled.div`
  height: 1.5em;
  //font-weight: 700;
  // font-family: Poppins;
  font-size: 1.9em;
  color: black;
`;

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
