import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../../Components/Common";
class RecruitProJumpStart extends Component {
  
  render() {
    return (
      <div class=" flex flex-col">
        <div class=" flex flex-row flex-wrap w-full mt-[0.9375em] items-start self-start justify-start grow shrink h-auto mr-auto ">    
          <JumpStartBox
        
            title=""
            noProgress
            stringValue
   
            bgColor="#005075"
      
          />
          <CurrencySymbol />
          <JumpStartBox
            // title="# Positions"
            
            noProgress
            stringValue
          
            bgColor="#0073a8"
          />

          <JumpStartBox
            noProgress
            stringValue
     
           
          
            bgColor="#0093d7"
          />
          <JumpStartBox
            noProgress
            stringValue
    
            title="Average Time"
         
       
            bgColor="#24b9fe"
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
)(RecruitProJumpStart);
