import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";

class OpportunityJumpstartBox extends Component {
  
  render() {
    return (
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
        
          <JumpStartBox
            noProgress
            title="# Requirements"
          />
       
          <JumpStartBox
            noProgress
            title="# Positions "
          />
          
        </div>
        <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
        <JumpStartBox
            noProgress
            title="# Selected"
            
          />
          <JumpStartBox
            noProgress
            title="# OnBoarded"
          />
        </div>
        </div>
      
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