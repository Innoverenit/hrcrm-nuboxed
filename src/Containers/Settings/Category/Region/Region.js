import React, { useState,useEffect,useRef } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { connect } from "react-redux";
import {  Input,Tooltip,Popconfirm} from "antd";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../Config/Auth";
import { bindActionCreators } from "redux";
import {
    getRegions,
    getRegionCount,
    addRegions,
    removeRegions,
    updateRegions,
    searchRegionName,
    handleRegionDrawerModal
    // ClearReducerDataOfDocument
  } from "./RegionAction";
import AddRegionModal from './AddRegionModal';
import { BundleLoader } from '../../../../Components/Placeholder';
import { MainWrapper } from '../../../../Components/UI/Layout';

const data = [
    { id: 1, region: "Europe" },
    { id: 2, region: "Africa" },
    { id: 3, region: "Antartica" }
];

const Region = (props) => {
  const [activeTab, setActiveTab] = useState("");
    const [regions, setRegions] = useState(props.regions);
    const [editingId, setEditingId] = useState(null);
    const years=[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    const [addingRegion, setAddingRegion] = useState(false);
    const [newRegionName, setNewRegionName] = useState('');
    const [currentData, setCurrentData] = useState("");
    const [currentregionId, setCurrentRegionId] = useState("");
    const [selectedYear, setSelectedYear] = useState(null);
  const [sales, setSales] = useState({ amount: '', currency: "",kpi:"" });
  const [fulfillment, setFulfillment] = useState({ amount: '',kpi:"" });
  const [investment, setInvestment] = useState({ amount: '', currency: "",kpi:"" });
    useEffect(() => {
        props.getRegions(props.organizationId); 
        props.getRegionCount(props.orgId) 
    }, [])

    function handleSetCurrentRegionId(regionsId) {
        setCurrentRegionId(regionsId);
      
      }

    const editRegion = (regionsId, regions,region) => {
      console.log(regionsId)
      console.log(regions)
      console.log(region)
        setEditingId(regionsId);
        setNewRegionName(regions);
    };
console.log(editingId)
    const deleteRegion = (id) => {
        const updatedRegions = regions.filter(region => region.id !== id);
        setRegions(updatedRegions);
    };

    const handleAddRegion = () => {
        setAddingRegion(true);
        setNewRegionName('');
    };

    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
      
    
        if (e.target.value.trim() === "") {
        //   setPage(pageNo + 1);
        props.getRegions(props.organizationId)
        //   props.ClearReducerDataOfLoad()
        }
      };

    const handleUpdateRegion=(region)=>{
        console.log(region)
        let data={
            regionsId:region.regionsId,
            regions:newRegionName
         
        }
props.updateRegions(data,region.regionsId)
setEditingId(null);
    }

    const handleSaveRegion = () => {
  
        let data={
            regions:newRegionName
        }
        props.addRegions(data,props.orgId)
        setAddingRegion(false); 
        console.log(regions)
        // setRegions(...props.regions);
    };

    const handleCancelAdd = () => {
        setNewRegionName('');
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    useEffect(() => {
        // Check if data is available
        if (props.regions.length > 0) {
          // Update activeTab when data is available
          setRegions(props.regions);
        }
      }, [props.regions]);

      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchRegionName(currentData);
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };
      const yearSelectRef = useRef(null);

      const resetData = () => {
        setSelectedYear(null);
        setActiveTab(null)
        setSales({ amount: null, currency: null,kpi:null });
        setFulfillment({ amount: null,kpi:null });
        setInvestment({ amount: null, currency: null,kpi:null });
       
        if (yearSelectRef.current) {
          yearSelectRef.current.value = ""; // Reset the value of the select element
        }
      };
console.log(regions)
if (props.fetchingRegions) {
    return <div><BundleLoader/></div>;
  }
    return (
        <>
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
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"region"}`}>
            <div className="circle-icon !text-base cursor-pointer text-[green]">
              <Tooltip placement="top" title="Download XL">
                <DownloadIcon />
              </Tooltip>
            </div>
          </a>
</div>
                {addingRegion ? (
                    <div>
                        <input 
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newRegionName} 
                            onChange={(e) => setNewRegionName(e.target.value)} 
                        />
                        <button onClick={handleSaveRegion}>Save</button>
                        <button onClick={handleCancelAdd}>Cancel</button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleAddRegion}> Add Region</button>
                )}
           
            </div>
            <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
            {regions.map(region => (
              <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.regionsId}>
              {/* Region name display or input field */}
              {editingId === region.regionsId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newRegionName}
                      onChange={(e) => setNewRegionName(e.target.value)}
                  />
              ) : (
                  <div >{region.regions}</div>
              )}

              {/* Action buttons */}
              <div className="actions">
                  {/* Edit button */}
                  <RemoveCircleOutlineIcon
                   onClick={() => {
                    handleSetCurrentRegionId(region.regionsId)
                    props.handleRegionDrawerModal(true);
                    resetData();
                    
                  }}
                  />
                  {editingId === region.regionsId ? (
                      <div>
                          <button onClick={() => handleUpdateRegion(region)}>Save</button>
                          <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <VisibilityIcon className=" cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.regionsId, region.regions,region)} />
                  )}

                  {/* Delete button */}
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() =>  props.removeRegions(region.regionsId,props.orgId)}
                        >
                  <DeleteOutlineIcon className=" cursor-pointer !text-icon text-red-600"
                   
                 
                // onClick={() => 
                //     props.removeRegions(region.regionsId)
                // }
                   />
                   </Popconfirm>
              </div>
          </div>
            ))}
            </MainWrapper>
            </div>
             <div class=" font-bold">Updated on {dayjs(props.regions && props.regions.length && props.regions[0].updationDate).format('YYYY-MM-DD')} by {props.regions && props.regions.length && props.regions[0].updatedBy}</div>
        </div>
        <AddRegionModal
        currentregionId={currentregionId}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        sales={sales}
        setSales={setSales}
        fulfillment={fulfillment}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        years={years}
        setFulfillment={setFulfillment}
        yearSelectRef={yearSelectRef}
        investment={investment}
        setInvestment={setInvestment}
        addRegionModal={props.addRegionModal}
        handleRegionDrawerModal={props.handleRegionDrawerModal}

        />
        </>
    );
};
const mapStateToProps = ({ region,auth  }) => ({
    // addingDocuments: document.addingDocuments,
    // addingDocumentsError: document.addingDocumentsError,
    regions: region.regions,
    addRegionModal:region.addRegionModal,
    fetchingRegions:region.fetchingRegions,
    organizationId: auth.userDetails.organizationId,
    orgId: auth.userDetails.organizationId,
    regiondata:region.regiondata,
    regionCount:region.regionCount,
    // removingDocuments: document.removingDocuments,
    // removingDocumentsError: document.removingDocumentsError,
    //   updatingDocuments: document.updatingDocuments,
    //   updatingDocumentsError: document.updatingDocumentsError,
    // fetchingDocuments: document.fetchingDocuments,
    // fetchingDocumentsError: document.fetchingDocumentsError,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRegions,
        addRegions,
        getRegionCount,
        updateRegions,
        // addDocuments,
        removeRegions,
        searchRegionName,
        handleRegionDrawerModal
        // updateDocuments,
        // ClearReducerDataOfDocument,
        // searchDocumentsName,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Region);

// export default Region;