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
    getIndustry,
    getIndustryCount,
    addIndustry,
    searchIndustryName,
    ClearReducerDataOfIndustry,
    removeIndustry,
    updateIndustry
} from "../Industry/IndustryAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


const Industry = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [industryListData, setIndustryListData] = useState(props.industryListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newIndustryName, setIndustryName] = useState('');
  useEffect(() => {
      props.getIndustry(props.orgId); 
      props.getIndustryCount(props.orgId) 
  }, [])

  const editRegion = (industryId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(industryId);
      setIndustryName(name);
  };



  const handleAddIndustry = () => {
      setAddingRegion(true);
      setIndustryName("")
  };

  const handleUpdateIndustry=(region)=>{
      console.log(region)
      let data={
        industryId:region.industryId,
        name:newIndustryName
       
      }
props.updateIndustry(data,region.industryId)
setEditingId(null);
  }

  const handleIndustry = () => {
 
      let data={
        name:newIndustryName,
        orgId:props.orgId,
      }
      props.addIndustry(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getIndustry(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchIndustryName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setIndustryName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.industryListData.length > 0) {
        
        setIndustryListData(props.industryListData);
      }
    }, [props.industryListData]);

// console.log(regions)
if (props.fetchingIndustry) {
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
                          placeholder="Add Industry"
                          value={newIndustryName} 
                          onChange={(e) => setIndustryName(e.target.value)} 
                      />
                      <button 
                    
                         loading={props.addingEquipment}
                      onClick={handleIndustry}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddIndustry}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingIndustry && industryListData.length === 0 ? <NodataFoundPage /> : industryListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="card9" key={region.industryId}>
            {/* Region name display or input field */}
            {editingId === region.industryId ? (
                <input
                placeholder="Update Industry"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newIndustryName}
                    onChange={(e) => setIndustryName(e.target.value)}
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
                {editingId === region.industryId ? (
                    <div>
                        <button onClick={() => handleUpdateIndustry(region)}>Save</button>
                        <button className=" ml-4"   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem", cursor:"pointer"}} onClick={() => editRegion(region.industryId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeIndustry(region.industryId,props.orgId)}
                      >
                <DeleteOutlined 
                  style={{
                    cursor:"pointer",
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.industryId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
           <div class=" font-bold">Updated on {dayjs(props.industryListData && props.industryListData.length && props.industryListData[0].updationDate).format('YYYY-MM-DD')} by {props.industryListData && props.industryListData.length && props.industryListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ industry,auth }) => ({
    addingEquipment: industry.addingEquipment,
    addingEquipmentError: industry.addingEquipmentError,
    industryListData: industry.industryListData,
    industryCount:industry.industryCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingEquipment: industry.removingEquipment,
removingEquipmentError: industry.removingEquipmentError,
fetchingIndustry: industry.fetchingIndustry,
fetchingIndustryError: industry.fetchingIndustryError,

updatingEquipment: industry.updatingEquipment,
updatingEquipmentError: industry.updatingEquipmentError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getIndustry,
        getIndustryCount,
        ClearReducerDataOfIndustry,
        searchIndustryName,
        addIndustry,
        removeIndustry,
        updateIndustry,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Industry);
