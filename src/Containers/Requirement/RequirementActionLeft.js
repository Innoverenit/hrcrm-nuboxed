import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";
import {

    inputJobOrderSearch,
  } from "../Opportunity/OpportunityAction";
  import {getAllRequirementTable,ClearReducerDataOfRequirement} from "../Requirement/RequirementAction"

import { StyledSelect } from "../../Components/UI/Antd";
const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;

const RequirementActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getAllRequirementTable(props.orgId)
      props.ClearReducerDataOfRequirement()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputJobOrderSearch(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
    useEffect(() => {
        // props.getRecords(props.userId);
        // if (transcript) {
        //   console.log(">>>>>>>",transcript)
        //   props.setCurrentData(transcript)
        // }
},[]);

const{user}=props;
return (
<div class=" flex items-center" >
<div class=" w-72 md:ml-4 max-sm:w-16 ml-0">
<Input
      placeholder="Search By Job ID"
       class="w-96"
            // suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
        {/* <Search
          placeholder="Search By Job ID"
          onChange={(e)=>props.handleChange(e)}
          value={props.currentData}
        /> */}
      </div>
      &nbsp; 
      {/* <Button
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
      
      </Button> */}
      

</div>
);
};

const mapStateToProps = ({ auth, requirement }) => ({
//   user: auth.userDetails,
orgId:auth.userDetails.organizationId,
//   recordData: candidate.recordData,
//   userId: auth.userDetails.userId,
//   recordAllData: candidate.recordAllData,
//   type: candidate.type,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputJobOrderSearch,
      getAllRequirementTable,
      ClearReducerDataOfRequirement
    
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequirementActionLeft);