import React, {  useEffect,useState,lazy} from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { Popconfirm,Tooltip,Input } from "antd";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getIdProofs,
  getIdProofCount,
  addIdProofs,
  removeIdProof,
  updateIdProofs,
  searchIdProofName,
  ClearReducerDataOfIdproof
} from "./IdProofAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const SingleIdProof = lazy(() =>
  import("./SingleIdProof")
);


const IdProofs = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [idProofs, setIdProofData] = useState(props.idProofs);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newIdProofName, setIdProofName] = useState('');
  useEffect(() => {
      props.getIdProofs(); 
      props.getIdProofCount(props.orgId) 
  }, [])

  const editRegion = (idProofTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(idProofTypeId);
      setIdProofName(name);
  };



  const handleAddIdProof = () => {
      setAddingRegion(true);
      setIdProofName("")
  };

  const handleUpdateIdProof=(region)=>{
      console.log(region)
      let data={
        idProofTypeId:region.idProofTypeId,
        idProofType:newIdProofName,
        editInd:true,
       
      }
props.updateIdProofs(data,region.idProofTypeId)
setEditingId(null);
  }

  const handleIdProof = () => {
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
        idProofType:newIdProofName,
        orgId:props.orgId,
        editInd:true,
      }
      props.addIdProofs(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getIdProofs();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchIdProofName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setIdProofName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.idProofs.length > 0) {
        
        setIdProofData(props.idProofs);
      }
    }, [props.idProofs]);

// console.log(regions)
if (props.fetchingIdProofs) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mt-7px mr-2"  >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[2rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"idProofType"}`}>
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
                        placeholder="Add Identity"
                      style={{border:"2px solid black",width:"50%"}}
                          type="text" 
                          value={newIdProofName} 
                          onChange={(e) => setIdProofName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingIdProofs}
                      onClick={handleIdProof}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddIdProof}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <div className="!h-[69vh] !mt-2" >
          {!props.fetchingIdProofs && idProofs.length === 0 ? <NodataFoundPage /> : idProofs.slice().sort((a, b) => a.idProofType.localeCompare(b.idProofType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.idProofTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.idProofTypeId ? (
                <input
                placeholder="Update Identity"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newIdProofName}
                    onChange={(e) => setIdProofName(e.target.value)}
                />
            ) : (
                <div >{region.idProofType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div>
                {/* Edit button */}
                {editingId === region.idProofTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateIdProof(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {region.editInd ? (
                    <BorderColorIcon  className="!text-icon cursor-pointer text-red-600" onClick={() => editRegion(region.idProofTypeId, region.idProofType)} />
                    ) : null}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeIdProof(region.idProofTypeId,props.orgId)}
                      >
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </div>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.idProofs && props.idProofs.length && props.idProofs[0].updationDate).format('YYYY-MM-DD')} by {props.idProofs && props.idProofs.length && props.idProofs[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ idProof,auth }) => ({
  addingIdProofs: idProof.addingIdProofs,
  idProofCount:idProof.idProofCount,
  orgId: auth.userDetails.organizationId,
  addingIdProofsError: idProof.addingIdProofsError,
  idProofs: idProof.idProofs,    
  fetchingIdProofs: idProof.fetchingIdProofs,
  fetchingIdProofsError: idProof.fetchingIdProofsError,
  updatingIdProofs: idProof.updatingIdProofs,
  updatingIdProofsError: idProof.updatingIdProofsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIdProofs,
      getIdProofCount,
      addIdProofs ,
      updateIdProofs,
      searchIdProofName,
      removeIdProof,
      ClearReducerDataOfIdproof
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(IdProofs);
