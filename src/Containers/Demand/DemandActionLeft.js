import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../Components/UI/Layout";
import { Input } from "antd";

import {
    inputJobOrderSearch,
  } from "../Opportunity/OpportunityAction";
import { StyledSelect } from "../../Components/UI/Antd";
import { Button} from "antd";
const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;

const DemandActionLeft = (props) => {

    useEffect(() => {
        // props.getRecords(props.userId);
        // if (transcript) {
        //   console.log(">>>>>>>",transcript)
        //   props.setCurrentData(transcript)
        // }
},[]);

const{user}=props;
return (
<FlexContainer alignItems="center">
<div style={{ marginLeft: "3px", width:"50%"}}>
        <Search
          placeholder="Search By Job ID"
          onChange={(e)=>props.handleChange(e)}
          value={props.currentData}
        />
      </div>
      &nbsp; 
      <Button
        type={ props.currentData? "primary" : "danger"}
        onClick={()=> {
          props.inputJobOrderSearch( props.currentData );      
          }}
      >     
        Submit
      </Button>
      &nbsp;
      <Button
        type={props.currentData ? "primary" : "danger"}
        onClick={props.handleClear}
      >
      
        Clear
      </Button>
      

</FlexContainer>
);
};

const mapStateToProps = ({ auth, requirement }) => ({
//   user: auth.userDetails,
//   recordData: candidate.recordData,
//   userId: auth.userDetails.userId,
//   recordAllData: candidate.recordAllData,
//   type: candidate.type,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputJobOrderSearch,
    
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandActionLeft);