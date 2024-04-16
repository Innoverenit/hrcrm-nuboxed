import React, { useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip,Button, Input } from "antd";
import dayjs from "dayjs";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { BundleLoader } from "../../../../Components/Placeholder";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import {
  getInvestorList,
  handleInvestorImportModal,
  getInvestorCount,
  searchInvestorTypeName,
  ClearReducerDataOfInvestorType,
    addInvestorData,
    removeInvestor,
  updateInvestor
} from "../InvestorTab/InvestorListAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";
import AddInvestorImportModal from "./AddInvestorImportModal";



const InvestorList = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [investorListData, setInvestorListData] = useState(props.investorListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newInvestorName, setInvestorName] = useState('');
  useEffect(() => {
      props.getInvestorList(props.orgId); 
      props.getInvestorCount(props.orgId) 
  }, [])

  const editRegion = (investorCategoryId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(investorCategoryId);
      setInvestorName(name);
  };



  const handleAddInvestor = () => {
      setAddingRegion(true);
      setInvestorName("")
  };

  const handleUpdateInvestor=(region)=>{
      console.log(region)
      let data={
        investorCategoryId:region.investorCategoryId,
        name:newInvestorName
       
      }
props.updateInvestor(data,region.investorCategoryId)
setEditingId(null);
  }

  const handleInvestor = () => {
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
        name:newInvestorName,
        orgId:props.orgId,
      }
      props.addInvestorData(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getInvestorList(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchInvestorTypeName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setInvestorName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.investorListData.length > 0) {
        
        setInvestorListData(props.investorListData);
      }
    }, [props.investorListData]);

// console.log(regions)
if (props.fetchingInvestorList) {
return <div><BundleLoader/></div>;
}
  return (
    <>
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
          <div class="w-[12rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"investorCategory"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div>
<div class="w-[5rem] mt-2">
<div className="circle-icon !text-base cursor-pointer text-[blue]">
  <Tooltip title="Upload XL">
  <FileUploadIcon  onClick={() => props.handleInvestorImportModal(true)}/>
  </Tooltip>
  </div>
        </div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                            placeholder="Add Investor"
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          value={newInvestorName} 
                          onChange={(e) => setInvestorName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleInvestor}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddInvestor}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingInvestorList && investorListData.length === 0 ? <NodataFoundPage /> : investorListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (

            <div className="card9" key={region.investorCategoryId}>
            {/* Region name display or input field */}
            
            {editingId === region.investorCategoryId ? (
                <input
                placeholder="Update Investor"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newInvestorName}
                    onChange={(e) => setInvestorName(e.target.value)}
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
                {editingId === region.investorCategoryId ? (
                    <div>
                        <button onClick={() => handleUpdateInvestor(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.investorCategoryId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeInvestor(region.investorCategoryId,props.orgId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.investorCategoryId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>

  <div class=" font-bold">Updated on {dayjs(props.investorListData && props.investorListData.length && props.investorListData[0].updationDate).format('YYYY-MM-DD')} by {props.investorListData && props.investorListData.length && props.investorListData[0].updatedBy}</div>
      </div>
       <AddInvestorImportModal
       handleInvestorImportModal={props.handleInvestorImportModal}
       addInvestorImportModal={props.addInvestorImportModal}
   
       /> 
       </>
  );
};

const mapStateToProps = ({ investorList,auth }) => ({
  addingInvestorData: investorList.addingInvestorData,
  addingInvestorDataError: investorList.addingInvestorDataError,
  investorListData: investorList.investorListData,
  investorCount:investorList.investorCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
addInvestorImportModal:investorList.addInvestorImportModal,
removingInvestor: investorList.removingInvestor,
removingInvestorError: investorList.removingInvestorError,
fetchingInvestorList: investorList.fetchingInvestorList,
fetchingInvestorListError: investorList.fetchingInvestorListError,

updatingInvestor: investorList.updatingInvestor,
updatingInvestorError: investorList.updatingInvestorError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorList,
      getInvestorCount,
      searchInvestorTypeName,
      ClearReducerDataOfInvestorType,
        addInvestorData,
        removeInvestor,
      updateInvestor,
      handleInvestorImportModal,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorList);
