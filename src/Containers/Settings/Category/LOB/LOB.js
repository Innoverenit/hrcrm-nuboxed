import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../Config/Auth";
import {
    getLob,
    getLobCount,
    addLob,
    searchLobName,
    ClearReducerDataOfLob,
    removeLob,
    updateLob
} from "../LOB/LOBAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";


const LOB = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [lobListData, setLobData] = useState(props.lobListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newLobName, setLobName] = useState('');
  useEffect(() => {
      props.getLob(props.orgId); 
      props.getLobCount(props.orgId) 
  }, [])

  const editRegion = (lobDetsilsId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(lobDetsilsId);
      setLobName(name);
  };



  const handleAddLob = () => {
      setAddingRegion(true);
      setLobName("")
  };

  const handleUpdateLob=(region)=>{
      console.log(region)
      let data={
        lobDetsilsId:region.lobDetsilsId,
        name:newLobName
       
      }
props.updateLob(data,region.lobDetsilsId)
setEditingId(null);
  }

  const handleLob = () => {
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
        name:newLobName,
        orgId:props.orgId,
      }
      props.addLob(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getLob(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchLobName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setLobName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.lobListData.length > 0) {
        
        setLobData(props.lobListData);
      }
    }, [props.lobListData]);

// console.log(regions)
if (props.fetchingLob) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mr-2 mt-[7px]" >
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
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"lob"}`}>
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
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          placeholder="Add LOB"
                          value={newLobName} 
                          onChange={(e) => setLobName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingLob}
                      onClick={handleLob}>Save</button>
                      <button  onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddLob}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingLob && lobListData.length === 0 ? <NodataFoundPage /> : lobListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.lobDetsilsId}>
            {/* Region name display or input field */}
            
            {editingId === region.lobDetsilsId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    placeholder="Update LOB"
                    value={newLobName}
                    onChange={(e) => setLobName(e.target.value)}
                />
            ) : (
                <div >{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.lobDetsilsId ? (
                    <div>
                        <button onClick={() => handleUpdateLob(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   className=" !text-icon text-red-600 cursor-pointer" onClick={() => editRegion(region.lobDetsilsId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeLob(region.lobDetsilsId,props.orgId)}
                      >
              <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
  <div class=" font-bold">Updated on {dayjs(props.lobListData && props.lobListData.length && props.lobListData[0].updationDate).format('YYYY-MM-DD')} by {props.lobListData && props.lobListData.length && props.lobListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ lob,auth }) => ({
    addingLob: lob.addingLob,
    lobCount:lob.lobCount,
    addingLobError: lob.addingLobError,
    lobListData: lob.lobListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingLob: lob.removingLob,
removingLobError: lob.removingLobError,
fetchingLob: lob.fetchingLob,
fetchingLobError: lob.fetchingLobError,

updatingLob: lob.updatingLob,
updatingLobError: lob.updatingLobError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getLob,
        getLobCount,
        ClearReducerDataOfLob,
        searchLobName,
        addLob,
        removeLob,
        updateLob,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LOB);
