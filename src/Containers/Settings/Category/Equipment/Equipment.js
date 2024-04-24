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
    getEquipment,
    getEquipmentCount,
    addEquipment,
    searchEquipmentName,
    ClearReducerDataOfEquipment,
    removeEquipment,
    updateEquipment
} from "../Equipment/EquipmentAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


const Equipment = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [equipmentListData, setEquipmentListData] = useState(props.equipmentListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newEquipmentName, setEquipmentName] = useState('');
  useEffect(() => {
      props.getEquipment(); 
      props.getEquipmentCount() 
  }, [])

  const editRegion = (equipmentId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(equipmentId);
      setEquipmentName(name);
  };



  const handleAddEquipment = () => {
      setAddingRegion(true);
      setEquipmentName("")
  };

  const handleUpdateEquipment=(region)=>{
      console.log(region)
      let data={
        equipmentId:region.equipmentId,
        name:newEquipmentName
       
      }
props.updateEquipment(data,region.equipmentId)
setEditingId(null);
  }

  const handleEquipment = () => {
 
      let data={
        name:newEquipmentName,
        orgId:props.orgId,
      }
      props.addEquipment(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getEquipment();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchEquipmentName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setEquipmentName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.equipmentListData.length > 0) {
        
        setEquipmentListData(props.equipmentListData);
      }
    }, [props.equipmentListData]);

// console.log(regions)
if (props.fetchingEquipment) {
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
          {/* <div class="w-[38rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"itemTask"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div> */}
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black",width:"53%"}}
                          type="text" 
                          placeholder="Add Equipment"
                          value={newEquipmentName} 
                          onChange={(e) => setEquipmentName(e.target.value)} 
                      />
                      <button 
                    
                         loading={props.addingEquipment}
                      onClick={handleEquipment}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddEquipment}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingEquipment && equipmentListData.length === 0 ? <NodataFoundPage /> : equipmentListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="card9" key={region.equipmentId}>
            {/* Region name display or input field */}
            {editingId === region.equipmentId ? (
                <input
                placeholder="Update Equipment"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newEquipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
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
                {editingId === region.equipmentId ? (
                    <div>
                        <button onClick={() => handleUpdateEquipment(region)}>Save</button>
                        <button className=" ml-4"   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem",cursor:"pointer"}} onClick={() => editRegion(region.equipmentId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeEquipment(region.equipmentId,props.orgId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  cursor:"pointer",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.equipmentId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
           <div class=" font-bold">Updated on {dayjs(props.equipmentListData && props.equipmentListData.length && props.equipmentListData[0].updationDate).format('YYYY-MM-DD')} by {props.equipmentListData && props.equipmentListData.length && props.equipmentListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ equipment,auth }) => ({
    addingEquipment: equipment.addingEquipment,
    addingEquipmentError: equipment.addingEquipmentError,
    equipmentListData: equipment.equipmentListData,
    equipmentCount:equipment.equipmentCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingEquipment: equipment.removingEquipment,
removingEquipmentError: equipment.removingEquipmentError,
fetchingEquipment: equipment.fetchingEquipment,
fetchingEquipmentError: equipment.fetchingEquipmentError,

updatingEquipment: equipment.updatingEquipment,
updatingEquipmentError: equipment.updatingEquipmentError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEquipment,
        getEquipmentCount,
        ClearReducerDataOfEquipment,
        searchEquipmentName,
        addEquipment,
        removeEquipment,
        updateEquipment,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Equipment);
