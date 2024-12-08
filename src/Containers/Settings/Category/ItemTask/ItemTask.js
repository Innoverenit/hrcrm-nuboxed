import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { base_url } from "../../../../Config/Auth";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, Input } from "antd";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";


import {
    getItemTask,
    getItemTaskCount,
    addItemTask,
    searchItemTaskName,
    ClearReducerDataOfItemTask,
    removeItemTask,
    updateItemTask
} from "../ItemTask/ItemTaskAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { Select } from 'antd';

const { Option } = Select;

const ItemTask = (props) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentData, setCurrentData] = useState("");
  const [itemTaskListData, setItemTaskListData] = useState(props.itemTaskListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newItemTaskName, setItemTaskName] = useState('');
  useEffect(() => {
      props.getItemTask(props.orgId); 
      props.getItemTaskCount(props.orgId) 
  }, [])

  const editRegion = (itemTaskId, name,level) => {
    console.log(name)
    console.log(name)
      setEditingId(itemTaskId);
      setItemTaskName(name);
      setSelectedLevel(level)
  };



  const handleAddItemTask = () => {
      setAddingRegion(true);
      setItemTaskName("")
  };

  const handleUpdateRegion=(region)=>{
      console.log(region)
      let data={
        itemTaskId:region.itemTaskId,
        name:newItemTaskName,
        level:selectedLevel
       
      }
props.updateItemTask(data,region.itemTaskId)
setEditingId(null);
  }

  const handleItemTaskLine = () => {
   
      let data={
        name:newItemTaskName,
        orgId:props.orgId,
        level:selectedLevel
      }
      props.addItemTask(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getItemTask(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchItemTaskName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setItemTaskName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };

  useEffect(() => {
      
      if (props.itemTaskListData.length > 0) {
        
        setItemTaskListData(props.itemTaskListData);
      }
    }, [props.itemTaskListData]);
    const handleChangeValue = (value) => {
      console.log("Selected Level:", value);
      setSelectedLevel(value); // Update selected value in state
    };

// console.log(regions)
if (props.fetchingItemTask) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mt-1 mr-3" >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[3rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"itemTask"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black",width:"53%"}}
                          type="text" 
                          placeholder="Add Repair Task"
                          value={newItemTaskName} 
                          onChange={(e) => setItemTaskName(e.target.value)} 
                      />

<Select
        style={{ width: 200 }}
        placeholder="Select a Level"
        onChange={handleChangeValue} 
        value={selectedLevel}   
      >
        <Option value="L1">L1</Option>
        <Option value="L2">L2</Option>
        <Option value="L3">L3</Option>
      </Select>
                      <button 
                    
                         loading={props.addingItemTask}
                      onClick={handleItemTaskLine}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddItemTask}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <div className="!h-[65vh] !mt-2 rounded border-[#0000001f]  border  shadow-[#a3abb980] border-solid text-black  p-1 w-full font-poppins overflow-auto"> 
          {!props.fetchingItemTask && itemTaskListData.length === 0 ? <NodataFoundPage /> : itemTaskListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 w-7rem font-bold   border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt2  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.itemTaskId}>
            {/* Region name display or input field */}
            {editingId === region.itemTaskId ? (
                <input
                placeholder="Update Repair Task"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newItemTaskName}
                    onChange={(e) => setItemTaskName(e.target.value)}
                />
            ) : (
                <div className="flex w-1/4">{region.name}
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
             {editingId === region.itemTaskId ? (
              
<Select
        style={{ width: 200 }}
        placeholder="Select a Level"
        onChange={handleChangeValue} 
        value={selectedLevel}   
      >
        <Option value="L1">L1</Option>
        <Option value="L2">L2</Option>
        <Option value="L3">L3</Option>
      </Select>
            ) : (
                <div className="flex w-1/6">{region.level}
               
                                      </div>
            )}

            <div className=" justify-end" >
                {/* Edit button */}
                {editingId === region.itemTaskId ? (
                    <div>
                        <button onClick={() => handleUpdateRegion(region)}>Save</button>
                        <button   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   className=" !text-icon text-red-600 cursor-pointer " onClick={() => editRegion(region.itemTaskId, region.name,region.level)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeItemTask(region.itemTaskId,props.orgId)}
                      >
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </div>
            </div>
           <div class=" font-bold">Updated on {dayjs(props.itemTaskListData && props.itemTaskListData.length && props.itemTaskListData[0].updationDate).format('YYYY-MM-DD')} by {props.itemTaskListData && props.itemTaskListData.length && props.itemTaskListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ itemTask,auth }) => ({
    addingItemTask: itemTask.addingItemTask,
    addingItemTaskError: itemTask.addingItemTaskError,
    itemTaskListData: itemTask.itemTaskListData,
    itemTaskCount:itemTask.itemTaskCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingItemTask: itemTask.removingItemTask,
removingItemTaskError: itemTask.removingItemTaskError,
fetchingItemTask: itemTask.fetchingItemTask,
fetchingItemTaskError: itemTask.fetchingItemTaskError,

updatingItemTask: itemTask.updatingItemTask,
updatingItemTaskError: itemTask.updatingItemTaskError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getItemTask,
        getItemTaskCount,
        ClearReducerDataOfItemTask,
        searchItemTaskName,
        addItemTask,
        removeItemTask,
        updateItemTask,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ItemTask);
