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