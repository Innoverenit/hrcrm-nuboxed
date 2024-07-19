import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, Input } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getMasterKpi,
   getMasterKpiCount,
  addMasterKpi,
     removeMasterKpi,
     updateMasterKpi,
   searchMasterKpiName,
   ClearReducerDataOfMasterKpi
} from "../KpiMasterList/KpiMasterListAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";
import PerformaneCurrencyToggle from "./PerformaneCurrencyToggle";


const KpiMasterList = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [masterKpiList, setMasterListData] = useState(props.masterKpiList);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newMasterKpiName, setMasterKpiName] = useState('');
  useEffect(() => {
      props.getMasterKpi(props.orgId); 
       props.getMasterKpiCount(props.orgId) 
  }, [])

  const editRegion = (performanceManagementId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(performanceManagementId);
      setMasterKpiName(name);
  };



  const handleAddMasterKpi = () => {
      setAddingRegion(true);
      setMasterKpiName("")
  };

  const handleUpdateMasterKpi=(region)=>{
      console.log(region)
      let data={
        performanceManagementId:region.performanceManagementId,
        kpi:newMasterKpiName
       
      }
props.updateMasterKpi(data,region.performanceManagementId)
setEditingId(null);
  }

  const handleMasterKpi = () => {
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
        kpi:newMasterKpiName,
        orgId:props.orgId,
      }
      props.addMasterKpi(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getMasterKpi(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
         props.searchMasterKpiName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setMasterKpiName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.masterKpiList.length > 0) {
        
        setMasterListData(props.masterKpiList);
      }
    }, [props.masterKpiList]);

// console.log(regions)
if (props.fetchingMasterKpi) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw] mt-3" >
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
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"performanceManagement"}`}>
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
                      placeholder="Add KPI"
                      style={{border:"2px solid black"}}
                          type="text" 
                          value={newMasterKpiName} 
                          onChange={(e) => setMasterKpiName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingMasterKpi}
                      onClick={handleMasterKpi}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddMasterKpi}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingMasterKpi && masterKpiList.length === 0 ? <NodataFoundPage /> : masterKpiList.slice().sort((a, b) => a.kpi.localeCompare(b.kpi)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-12" key={region.performanceManagementId}>
            {/* Region name display or input field */}
            <div className=" flex flex-row">
            {editingId === region.performanceManagementId ? (
                <input
                placeholder="Update KPI"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newMasterKpiName}
                    onChange={(e) => setMasterKpiName(e.target.value)}
                />
            ) : (
                <div className=" w-[10rem]" >{region.kpi}
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
    <div className=" w-[40rem]">
    <div class=" text-sm  font-medium font-poppins">

Currency
</div>
                    <PerformaneCurrencyToggle
                      kpi={region.kpi}
                      currencyInd={region.currencyInd}
                      region={region}
                      performanceManagementId={region.performanceManagementId}
                    />
                  </div>
                  </div>
            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.performanceManagementId ? (
                    <div>
                        <button onClick={() => handleUpdateMasterKpi(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon  className=" cursor-pointer !text-icon text-red-600"  onClick={() => editRegion(region.performanceManagementId, region.kpi)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeMasterKpi(region.performanceManagementId,props.orgId)}
                      >
                <DeleteOutlined className=" cursor-pointer !text-icon text-red-600"
              // onClick={() => 
              //     props.removeServiceLine(item.performanceManagementId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
         </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.masterKpiList && props.masterKpiList.length && props.masterKpiList[0].updationDate).format('YYYY-MM-DD')} by {props.masterKpiList && props.masterKpiList.length && props.masterKpiList[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ masterKpi,auth }) => ({
    addingMasterKpi: masterKpi.addingMasterKpi,
    addingMasterKpiError: masterKpi.addingMasterKpiError,
  masterKpiList: masterKpi.masterKpiList,
  masterKpiCount:masterKpi.masterKpiCount,
  orgId: auth.userDetails.organizationId,
  removingMasterKpi: masterKpi.removingMasterKpi,
  removingMasterKpiError: masterKpi.removingMasterKpiError,
  fetchingMasterKpi: masterKpi.fetchingMasterKpi,
  fetchingMasterKpiError: masterKpi.fetchingMasterKpiError,

  updatingMasterKpi: masterKpi.updatingMasterKpi,
  updatingMasterKpiError: masterKpi.updatingMasterKpiError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMasterKpiCount,
      getMasterKpi,
      addMasterKpi,
      removeMasterKpi,
      updateMasterKpi,
      searchMasterKpiName,
      ClearReducerDataOfMasterKpi
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(KpiMasterList);
