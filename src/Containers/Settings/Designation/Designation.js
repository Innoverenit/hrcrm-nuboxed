import React, {  useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm,Input,Tooltip } from "antd";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../Components/Placeholder";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import {
  getDesignations,
  getDesignationCount,
  addDesignations,
   removeDesignations,
  updateDesignations,
  searchDesignationName,
  ClearReducerDataOfDesignation
} from "./DesignationAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";


const Designation = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [designations, setDesignationsData] = useState(props.designations);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newDesignationName, setDesignationName] = useState('');
  useEffect(() => {
      props.getDesignations(); 
      props.getDesignationCount(props.orgId) 
  }, [])

  const editRegion = (designationTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(designationTypeId);
      setDesignationName(name);
  };



  const handleAddDesignation = () => {
      setAddingRegion(true);
      setDesignationName("")
  };

  const handleUpdateDesignation=(region)=>{
      console.log(region)
      let data={
        designationTypeId:region.designationTypeId,
        designationType:newDesignationName
       
      }
props.updateDesignations(data,region.designationTypeId)
setEditingId(null);
  }

  const handleDesignation = () => {
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
        editInd:true,
        designationType:newDesignationName,
        orgId:props.orgId,
        editInd:true,
      }
      props.addDesignations(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getDesignations();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchDesignationName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setDesignationName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.designations.length > 0) {
        
        setDesignationsData(props.designations);
      }
    }, [props.designations]);

// console.log(regions)
if (props.fetchingDesignations) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw]" >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="ml-2 mr-2">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"designation"}`}>
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
                        placeholder="Add Designation"
                      style={{border:"2px solid black"}}
                          type="text" 
                          value={newDesignationName} 
                          onChange={(e) => setDesignationName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingDesignations}
                      onClick={handleDesignation}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddDesignation}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingDesignations && designations.length === 0 ? <NodataFoundPage /> : designations.slice().sort((a, b) => a.designationType.localeCompare(b.designationType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.designationTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.designationTypeId ? (
                <input
                placeholder="Update Designation"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newDesignationName}
                    onChange={(e) => setDesignationName(e.target.value)}
                />
            ) : (
                <div >{region.designationType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.designationTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateDesignation(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {region.editInd ? (
                    <BorderColorIcon     className=" !text-icon text-red-600 cursor-pointer "  onClick={() => editRegion(region.designationTypeId, region.designationType)} />
                    ) : null}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeDesignations(region.designationTypeId,props.orgId)}
                      >
              <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.designations && props.designations.length && props.designations[0].updationDate).format('YYYY-MM-DD')} by {props.designations && props.designations.length && props.designations[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ designations,auth }) => ({
  addingDesignations: designations.addingDesignations,
  addingDesignationsError: designations.addingDesignationsError,
  designations: designations.designations,
  orgId: auth.userDetails.organizationId,
  removingDesignations: designations.removingDesignations,
  removingDesignationsError: designations.removingDesignationsError,
     updatingDesignations: designations.updatingDesignations,
     updatingDesignationsError: designations.updatingDesignationsError,
  fetchingDesignations: designations.fetchingDesignations,
  fetchingDesignationsError: designations.fetchingDesignationsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDesignations,
      getDesignationCount,
      addDesignations,
       updateDesignations,
       searchDesignationName,
       removeDesignations,
       ClearReducerDataOfDesignation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Designation);
