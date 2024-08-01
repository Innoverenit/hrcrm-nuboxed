import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm,Tooltip, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import {
  getDevelopment,
  getDevelopmentCount,
  addDevelopment,
  updateDevelopment,
  searchDevelopmentName,removeDevelopment,ClearReducerDataOfDevelopment
} from "./DevelopmentAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import * as Yup from "yup";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { getTasks } from "../../Task/TaskAction";
import { Select } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  departmentName: Yup.string().required("Input needed!"),
});


const DevelopmentList = (props) => {
  const [taskTypeId, setTaskTypeId] = useState("");
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [developmentList, setDevelopmentData] = useState(props.developmentList);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newDevelopmentName, setDevelopmentName] = useState('');
  useEffect(() => {
      props.getDevelopment(props.orgId); 
      props.getTasks();
      props.getDevelopmentCount(props.orgId) 
  }, [])

  const editRegion = (developmentId, taskTypeId,value,developmentType) => {

      setEditingId(developmentId);
      setTaskTypeId(taskTypeId)
      setDevelopmentName(value);
      setSelectedOption(developmentType);
      // setTaskTypeId(value);
  };

  const handleTask = (event) => {
    const taskTypeId = event.target.value;
    setTaskTypeId(taskTypeId);
  };

  const handleAddDevelopment = () => {
      setAddingRegion(true);
      setDevelopmentName("");
      setTaskTypeId("");
      setSelectedOption("");
  };
  const handleOptionChange = (value) => {
    setSelectedOption(value);
};
  const handleUpdateDevelopment=(region)=>{
      console.log(region)
      let data={
        department:props.departmentId,
        roleType:region.roleTypeId,
        organizationId:props.organizationId,
        userId:props.userId,
        value:newDevelopmentName,
        taskType:taskTypeId,
        developmentType: selectedOption 
       
      }
props.updateDevelopment(data,region.developmentId)
setEditingId(null);
  }

  const handleDevelopment = () => {
 
      let data={
        department:props.departmentId,
        roleType:props.roleTypeId,
        value:newDevelopmentName,
        organizationId:props.organizationId,
        userId:props.userId,
        taskType:taskTypeId,
        developmentType: selectedOption 
       
      }
      props.addDevelopment(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getDevelopment(props.orgId); 
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchDevelopmentName(taskTypeId,currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setDevelopmentName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.developmentList.length > 0) {
        
        setDevelopmentData(props.developmentList);
      }
    }, [props.developmentList]);

// console.log(regions)
if (props.fetchingDevelopment) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
            <label class=" font-bold ml-[15rem]">Configuration is per weekly basis</label>
    <div class=" flex flex-row justify-between">

    <div class=" flex w-[14vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          {/* <div class="w-[20rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"roleType"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div> */}

            <div className="add-region" style={{width:"45vw"}}>
              {addingRegion ? (
                  <div>
      
      <select 
    className="customize-select"
    onChange={handleTask}
>
    <option value="">Select Task</option>
    {props.tasks.map((item) => (
        <option 
            key={item.taskTypeId} value={item.taskTypeId}>
            {item.taskType}
        </option>
    ))}
</select>             
     
      <input 
                        placeholder="Input"
                      style={{border:"2px solid black",width: "23%",marginLeft:"2rem"}}
                          type="text" 
                          value={newDevelopmentName} 
                          onChange={(e) => setDevelopmentName(e.target.value)} 
                      />
  
  <select
    className="customize-select"
                    value={selectedOption}
                    onChange={(e) => handleOptionChange(e.target.value)}
                    style={{ marginLeft: "1rem" }}
                >
                    <option value="">Select Option</option>
                    <option value="percentage">Percentage</option>
                    <option value="hours">Hours/Week</option>
                </select>
                      <button 
                      className=" ml-2"
                         loading={props.addingDevelopment}
                      onClick={handleDevelopment}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddDevelopment}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
          <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingDevelopment && developmentList.map((region, index) =>(
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.developmentId}>
            {/* Region name display or input field */}
            
        

{editingId === region.developmentId ? (
                           
                      
                             <select 
                            //  defaultValue={region.taskType}
                             className="customize-select"
                             onChange={handleTask}
                         >
                             <option value="">Select Task</option>
                             {props.tasks.map((item) => (
                                 <option 
                                     key={item.taskTypeId} value={item.taskTypeId}>
                                     {item.taskType}
                                 </option>
                             ))}
                         </select> 
              ) : (

                  <div  style={{width:"20rem"}}>{region.taskType}&nbsp;&nbsp;&nbsp;
                  {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                          New
                                        </span> : null}</div>
              )}

{editingId === region.developmentId ? (
              <>
                <input
            // defaultValue={region.value}
            placeholder="Update"
            style={{border:"2px solid black"}}
            type="text"
            value={newDevelopmentName}
            onChange={(e) => setDevelopmentName(e.target.value)}
        />
          <select
    className="customize-select"
                    value={selectedOption}
                    onChange={(e) => handleOptionChange(e.target.value)}
                    style={{ marginLeft: "1rem" }}
                >
                    <option value="">Select Option</option>
                    <option value="percentage">Percentage</option>
                    <option value="hours">Hours/Week</option>
                </select>
     
                </>
            ) : (
                <div  style={{width:"15rem"}}>
                  {region.value} {region.developmentType === 'percentage' ? '%' : region.developmentType}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.developmentId ? (
                    <div>
                        <button onClick={() => handleUpdateDevelopment(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {/* {region.editInd ? ( */}
                    <BorderColorIcon    className=" !text-icon text-red-600 cursor-pointer "  onClick={() => editRegion(region.developmentId, region.taskType,region.value,region.developmentType)} />
                    {/* ) : null} */}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeDevelopment(region.developmentId,props.orgId)}
                      >
                <DeleteOutlined 
                    className=" !text-icon text-red-600 cursor-pointer " 
              // onClick={() => 
              //     props.removeServiceLine(item.developmentId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
        <div class=" font-bold">Updated on {dayjs(props.developmentList && props.developmentList.length && props.developmentList[0].updationDate).format('YYYY-MM-DD')} by {props.developmentList && props.developmentList.length && props.developmentList[0].updatedBy}</div>
        </MainWrapper>
            </div>
      
  
      </div>
  );
};

const mapStateToProps = ({ development, auth, tasks }) => ({
  addingDevelopment: development.addingDevelopment,
  addingDevelopmentError: development.addingDevelopmentError,
  developmentList: development.developmentList,
  tasks: tasks.tasks,
  developeCount:development.developeCount,
  updatingDevelopment: development.updatingDevelopment,
  userId: auth.userDetails.userId,
  updatingDevelopmentError: development.updatingDevelopmentError,
  fetchingDevelopment: development.fetchingDevelopment,
  fetchingDevelopmentError: development.fetchingDevelopmentError,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDevelopment,
      getDevelopmentCount,
      addDevelopment,
      updateDevelopment,
      getTasks,
      searchDevelopmentName,
      removeDevelopment,
      ClearReducerDataOfDevelopment
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DevelopmentList);
