import React, { useState,useEffect } from 'react';
import { EditOutlined, DeleteOutlined,PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import {  Input} from "antd";
import { bindActionCreators } from "redux";
import {
    getRegions,
    addRegions,
    removeRegions,
    updateRegions,
    searchRegionName,
    // ClearReducerDataOfDocument
  } from "./RegionAction";

const data = [
    { id: 1, region: "Europe" },
    { id: 2, region: "Africa" },
    { id: 3, region: "Antartica" }
];

const Region = (props) => {
    const [regions, setRegions] = useState(props.regions);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newRegionName, setNewRegionName] = useState('');
    const [currentData, setCurrentData] = useState("");
    useEffect(() => {
        props.getRegions(props.organizationId);  
    }, [])

    const editRegion = (id, regionName) => {
        setEditingId(id);
        setNewRegionName(regionName);
    };

    const deleteRegion = (id) => {
        const updatedRegions = regions.filter(region => region.id !== id);
        setRegions(updatedRegions);
    };

    const handleAddRegion = () => {
        setAddingRegion(true);
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
        // if (newRegionName.trim() !== '') {
        //     console.log("New Region:", newRegionName);
        //     const newRegion = {
        //         id: Date.now(),
        //         region: newRegionName
        //     };
        //     setRegions([...regions, newRegion]);
        //     setNewRegionName('');
        //     setAddingRegion(false);
        // }
        let data={
            regions:newRegionName
        }
        props.addRegions(data)
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
console.log(regions)
    return (
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
                  <MinusCircleOutlined/>
                  {editingId === region.regionsId ? (
                      <div>
                          <button onClick={() => handleUpdateRegion(region)}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <EditOutlined onClick={() => editRegion(region.regionsId, region.regions)} />
                  )}

                  {/* Delete button */}
                  <DeleteOutlined 
                onClick={() => 
                    props.removeRegions(region.regionsId)
                }
                   />
              </div>
          </div>
            ))}
        </div>
    );
};
const mapStateToProps = ({ region,auth  }) => ({
    // addingDocuments: document.addingDocuments,
    // addingDocumentsError: document.addingDocumentsError,
    regions: region.regions,
    organizationId: auth.userDetails.organizationId,
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
        updateRegions,
        // addDocuments,
        removeRegions,
        searchRegionName
        // updateDocuments,
        // ClearReducerDataOfDocument,
        // searchDocumentsName,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Region);

// export default Region;