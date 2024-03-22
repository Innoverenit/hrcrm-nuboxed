import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button,Popconfirm, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import {
  getShipByData,
  getShipByCount,
  addShipBy,
  ClearReducerDataOfShipBy,
  searchShipByName,
  removeShipBy,
  updateShipBy
} from "../ShipBy/ShipByAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ShipBy = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [ShipByData, setShipByData] = useState(props.ShipByData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newShipByName, setShipByName] = useState('');
  useEffect(() => {
      props.getShipByData(props.orgId); 
      props.getShipByCount(props.orgId) 
  }, [])

  const editRegion = (shipById, name) => {
    console.log(name)
    console.log(name)
      setEditingId(shipById);
      setShipByName(name);
  };



  const handleAddShipBy = () => {
      setAddingRegion(true);
      setShipByName("")
  };

  const handleUpdateShipBy=(region)=>{
      console.log(region)
      let data={
        shipById:region.shipById,
        name:newShipByName
       
      }
props.updateShipBy(data,region.shipById)
setEditingId(null);
  }

  const handleShipBy = () => {
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
        name:newShipByName,
        orgId:props.orgId,
      }
      props.addShipBy(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getShipByData(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchShipByName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setShipByName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.ShipByData.length > 0) {
        
        setShipByData(props.ShipByData);
      }
    }, [props.ShipByData]);

// console.log(regions)
if (props.fetchingShipBy) {
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
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black"}}
                          type="text" 
                          value={newShipByName} 
                          onChange={(e) => setShipByName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleShipBy}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddShipBy}> Add More</button>
              )}
          </div>
          </div>
          {!props.fetchingShipBy && ShipByData.length === 0 ? <NodataFoundPage /> : ShipByData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="card9" key={region.shipById}>
            {/* Region name display or input field */}
            
            {editingId === region.shipById ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    value={newShipByName}
                    onChange={(e) => setShipByName(e.target.value)}
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
                {editingId === region.shipById ? (
                    <div>
                        <button onClick={() => handleUpdateShipBy(region)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.shipById, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeShipBy(region.shipById)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.shipById)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
  <div class=" font-bold">Updated on {dayjs(props.ShipByData && props.ShipByData.length && props.ShipByData[0].updationDate).format('YYYY-MM-DD')} by {props.ShipByData && props.ShipByData.length && props.ShipByData[0].updatedBy}</div>
      </div>
  );
};



const mapStateToProps = ({ shipBy,auth }) => ({
  addingShipBy: shipBy.addingShipBy,
  addingShipByError: shipBy.addingShipByError,
  ShipByData: shipBy.ShipByData,
  shipByCount:shipBy.shipByCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingShipBy: shipBy.removingShipBy,
removingShipByError: shipBy.removingShipByError,
fetchingShipBy: shipBy.fetchingShipBy,
fetchingShipByError: shipBy.fetchingShipByError,

updatingShipBy: shipBy.updatingShipBy,
updatingShipByError: shipBy.updatingShipByError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipByData,
      getShipByCount,
      ClearReducerDataOfShipBy,
      searchShipByName,
      addShipBy,
      removeShipBy,
      updateShipBy,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ShipBy);
