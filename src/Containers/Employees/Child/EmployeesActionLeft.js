import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledSelect } from "../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
import { inputEmployeeDataSearch,getEmployeelist,ClearReducerDataOfEmployee, getRecords } from "../EmployeeAction";
import {  Input, Tooltip, Badge,Avatar } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, {  } from 'react-speech-recognition';
import { FormattedMessage } from "react-intl";
import {getDepartments} from "../../Settings/Department/DepartmentAction"
import { getlocation } from "../../Event/Child/Location/LocationAction";
import GridViewIcon from '@mui/icons-material/GridView';
const { Search } = Input;
const Option = StyledSelect.Option;

const EmployeesActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getEmployeelist("cretiondate","active");
      props.ClearReducerDataOfEmployee()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputEmployeeDataSearch(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  useEffect(() => {
    if (props.viewType === "tile") {
      props.getRecords(props.orgId,"active");
    }else if (props.viewType === "table") {
      props.getRecords(props.orgId,"all");
    } else if (props.viewType === "card") {
      props.getRecords(props.orgId);
    }
    props.getlocation(props.orgId);
    props.getDepartments();
  }, [props.viewType]);
  // useEffect(()=>{
  //   props.getCountries();
  // })
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      class=" !text-icon text-[#1890ff]" 

    />
  );
  const {user}=props;
  return (
    <div class=" flex items-center">
      <Tooltip
        title={<FormattedMessage id="app.activeuser" defaultMessage="Active Users" />}
      > 
       <Badge
          size="small"
          count={
            (props.viewType === "tile" &&
              props.employeerecordData.EmployeeListByLiveInd) ||
            0
          }
          overflowCount={999}
        >
      <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setEmployeeViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "tile" ? "#f279ab" : "#4bc076" }}>
            <GridViewIcon className="text-white !text-icon"/>
            </Avatar>
          </span>
          </Badge> 
      </Tooltip>
  
      <Tooltip title={<FormattedMessage id="app.allusers" defaultMessage="All " />}>
      <Badge
          size="small"
          count={
            (props.viewType === "table" &&
              props.employeerecordData.EmployeeListByLiveInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer !text-icon"
            onClick={() => props.setEmployeeViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
            <div class="text-white !text-icon">ALL</div>
            </Avatar>
          </span>
          </Badge>
      </Tooltip>

      <div class=" ml-6 h-6 w-72">
      <Input
     placeholder="Search By Name"
      width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
   
      </div>
   
        <div  class=" w-[35%] mt-2 ml-2">
          <StyledSelect placeholder="Sort"  defaultValue="cretiondate" onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="cretiondate">Creation Date</Option>
          <Option value="AtoZ">A To Z</Option>
            <Option value="ZtoA">Z To A</Option>
           
          </StyledSelect>
        </div>
        <div class=" flex items-center ml-4"  style={{border:"0.5px solid lightgray "}} >
                  <select
                    // placeholder="Select Location"
                    //  defaultValue={partners}
                    style={{ width: "auto",margin:"auto"}}
                     onChange={props.handleLocationChange}
                     value={props.selectedLocation}
                  >
                    <option value="">All Locations</option>
                    {props.showLocation.map((item) => {
                      return (
                        <option value={item.locationName}>
                          {item.locationName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class=" flex items-center ml-4"  style={{border:"0.5px solid lightgray "}} >
                  <select
                    // placeholder="Select Location"
                    //  defaultValue={partners}
                    style={{ width: "auto",margin:"auto"}}
                     onChange={props.handleDepartmentChange}
                     value={props.selectedDepartment}
                    //  disabled={!props.selectedLocation}
                  >
                    <option value="">All Departments</option>
                    {props.departments.map((item) => {
                      return (
                        <option value={item.departmentName}>
                          {item.departmentName}
                        </option>
                      );
                    })}
                  </select>
                </div>
    </div>
  );
};

const mapStateToProps = ({ auth,location,departments, employee }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  showLocation:location.showLocation,
  departments: departments.departments,
  employeerecordData: employee.employeerecordData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputEmployeeDataSearch,
      getRecords,
      getEmployeelist,
      getlocation,
      getDepartments,
      ClearReducerDataOfEmployee
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeesActionLeft)
);
