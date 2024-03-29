import React, { useState,useEffect,useRef } from 'react';
import { EditOutlined, DeleteOutlined,PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import {  Input,Popconfirm} from "antd";
import dayjs from "dayjs";
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
  const [sales, setSales] = useState({ amount: '', currency: "" });
  const [fulfillment, setFulfillment] = useState({ amount: '' });
  const [investment, setInvestment] = useState({ amount: '', currency: "" });
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
        setSales({ amount: null, currency: null });
        setFulfillment({ amount: null });
        setInvestment({ amount: null, currency: null });
       
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
              <div class=" flex flex-row justify-between">
              <div class=" flex w-[18vw]" style={{marginTop:"-8px"}} >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
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
            {regions.map(region => (
              <div className="card9" key={region.regionsId}>
              {/* Region name display or input field */}
              {editingId === region.regionsId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newRegionName}
                      onChange={(e) => setNewRegionName(e.target.value)}
                  />
              ) : (
                  <div className="region">{region.regions}</div>
              )}

              {/* Action buttons */}
              <div className="actions">
                  {/* Edit button */}
                  <MinusCircleOutlined
                   onClick={() => {
                    handleSetCurrentRegionId(region.regionsId)
                    props.handleRegionDrawerModal(true);
                    resetData();
                    
                  }}
                  />
                  {editingId === region.regionsId ? (
                      <div>
                          <button onClick={() => handleUpdateRegion(region)}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <EditOutlined onClick={() => editRegion(region.regionsId, region.regions,region)} />
                  )}

                  {/* Delete button */}
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() =>  props.removeRegions(region.regionsId,props.orgId)}
                        >
                  <DeleteOutlined 
                   style={{
                    
                    color: "red",
                  }}
                // onClick={() => 
                //     props.removeRegions(region.regionsId)
                // }
                   />
                   </Popconfirm>
              </div>
          </div>
            ))}
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