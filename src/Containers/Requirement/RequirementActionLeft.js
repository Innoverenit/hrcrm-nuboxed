import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input,Tooltip, Avatar  } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { inputJobOrderSearch, } from "../Opportunity/OpportunityAction";
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
<div class="flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">


      <Tooltip
        title="My View"
      >
       


          <span class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setRequirementViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
             }}>
              <TocIcon className="text-white !text-icon" /></Avatar>

          </span>
       
      </Tooltip>   
      <Tooltip
        title="All"
      >
       


          <span class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setRequirementViewType("All")}
            style={{
              color: props.viewType === "All" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "All" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "All" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "All" ? "scale(1.05)" : "scale(1)"
             }}>
              All</Avatar>

          </span>
       
      </Tooltip>
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