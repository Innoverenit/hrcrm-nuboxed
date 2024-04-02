import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { base_url } from "../../../../Config/Auth";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button,Popconfirm,Tooltip, Input } from "antd";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
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


const ItemTask = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [itemTaskListData, setItemTaskListData] = useState(props.itemTaskListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newItemTaskName, setItemTaskName] = useState('');
  useEffect(() => {
      props.getItemTask(props.orgId); 
      props.getItemTaskCount(props.orgId) 
  }, [])

  const editRegion = (itemTaskId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(itemTaskId);
      setItemTaskName(name);
  };



  const handleAddItemTask = () => {
      setAddingRegion(true);
      setItemTaskName("")
  };

  const handleUpdateRegion=(region)=>{
      console.log(region)
      let data={
        itemTaskId:region.itemTaskId,
        name:newItemTaskName
       
      }
props.updateItemTask(data,region.itemTaskId)
setEditingId(null);
  }

  const handleItemTaskLine = () => {
      // if (newRegionName.trim() !== '') {
      //     console.log("New Region:", newRegionName);
      //     const newRegion = {
      //         id: Date.now(),
      //         item: newRegionName
      //     };
      //     setRegions([...regions, newRegion]);
      //     setNewRegionName('');
      //     setAddingRegion(false);
      // }
      let data={
        name:newItemTaskName,
        orgId:props.orgId,
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

// console.log(regions)
if (props.fetchingItemTask) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[38rem]">
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
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingItemTask && itemTaskListData.length === 0 ? <NodataFoundPage /> : itemTaskListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="card9" key={region.itemTaskId}>
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
                <div className="region">{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.itemTaskId ? (
                    <div>
                        <button onClick={() => handleUpdateRegion(region)}>Save</button>
                        <button className=" ml-4"   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.itemTaskId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeItemTask(region.itemTaskId,props.orgId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.itemTaskId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
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
