import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, message,Input } from "antd";

import { BundleLoader } from "../../../Components/Placeholder";
import {
  getEducations,
  getEducationCount,
  addEducations,
  removeEducation,
  updateEducations,
  searchEducationsName,
  ClearReducerDataOfEducation
} from "./EducationAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";




const Education = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [educations, setEducationData] = useState(props.educations);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newEducationName, setEducationName] = useState('');
  useEffect(() => {
      props.getEducations(); 
      props.getEducationCount(props.orgId) 
  }, [])

  const editRegion = (educationTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(educationTypeId);
      setEducationName(name);
  };



  const handleAddEducation = () => {
      setAddingRegion(true);
      setEducationName("")
  };

  const handleUpdateEducation=(region)=>{
      console.log(region)
      let data={
        educationTypeId:region.educationTypeId,
        educationType:newEducationName
       
      }
props.updateEducations(data,region.educationTypeId)
setEditingId(null);
  }

  const handleEducation = () => {
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
        educationType:newEducationName,
        orgId:props.orgId,
        editInd:true,
      }
      props.addEducations(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getEducations();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchEducationsName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setEducationName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.educations.length > 0) {
        
        setEducationData(props.educations);
      }
    }, [props.educations]);

// console.log(regions)
if (props.fetchingEducations) {
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
          <div class="w-[3rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"educationType"}`}>
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
                        placeholder="Add Education"
                      style={{border:"2px solid black",width:"52%"}}
                          type="text" 
                          value={newEducationName} 
                          onChange={(e) => setEducationName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingIdProofs}
                      onClick={handleEducation}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddEducation}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingEducations && educations.length === 0 ? <NodataFoundPage /> : educations.slice().sort((a, b) => a.educationType.localeCompare(b.educationType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.educationTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.educationTypeId ? (
                <input
                placeholder="Update Education"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newEducationName}
                    onChange={(e) => setEducationName(e.target.value)}
                />
            ) : (
                <div >{region.educationType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.educationTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateEducation(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {region.editInd ? (
                    <BorderColorIcon className=" cursor-pointer !text-icon text-red-600"   onClick={() => editRegion(region.educationTypeId, region.educationType)} />
                    ) : null}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeEducation(region.educationTypeId,props.orgId)}
                      >
                <DeleteOutlined className=" cursor-pointer !text-icon text-red-600"
                  
              // onClick={() => 
              //     props.removeServiceLine(item.educationTypeId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.educations && props.educations.length && props.educations[0].updationDate).format('YYYY-MM-DD')} by {props.educations && props.educations.length && props.educations[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ education ,auth}) => ({
  addingEducations: education.addingEducations,
  addingEducationsError: education.addingEducationsError,
  educations: education.educations,
  educationCount:education.educationCount,
  orgId: auth.userDetails.organizationId,
  removingEducations: education.removingEducations,
  removingEducationsError: education.removingEducationsError,
  fetchingEducations: education.fetchingEducations,
  fetchingEducationsError: education.fetchingEducationsError,

  updatingEducations: education.updatingEducations,
  updatingEducationsError: education.updatingEducationsError,
  // fetchingDocuments: document.fetchingDocuments,
  // fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducations,
      getEducationCount,
      addEducations,
      removeEducation,
      updateEducations,
      searchEducationsName,
      ClearReducerDataOfEducation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Education);
