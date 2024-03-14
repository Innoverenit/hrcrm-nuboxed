import React, { useState,useEffect } from 'react';
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getRegions,
    addRegions,
    // removeDocuments,
    // updateDocuments,
    // searchDocumentsName,
    // ClearReducerDataOfDocument
  } from "./RegionAction";

const data = [
    { id: 1, region: "Europe" },
    { id: 2, region: "Africa" },
    { id: 3, region: "Antartica" }
];

const Region = (props) => {
    const [regions, setRegions] = useState(props.regions);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newRegionName, setNewRegionName] = useState('');
    useEffect(() => {
        props.getRegions(props.organizationId);  
    }, [])

    const editRegion = (id) => {
        const newName = prompt('Enter new region name:');
        if (newName !== null && newName.trim() !== '') {
            const updatedRegions = regions.map(region => {
                if (region.id === id) {
                    return { ...region, region: newName };
                }
                return region;
            });
            setRegions(updatedRegions);
        }
    };

    const deleteRegion = (id) => {
        const updatedRegions = regions.filter(region => region.id !== id);
        setRegions(updatedRegions);
    };

    const handleAddRegion = () => {
        setAddingRegion(true);
    };

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
    useEffect(() => {
        // Check if data is available
        if (props.regions.length > 0) {
          // Update activeTab when data is available
          setRegions(props.regions);
        }
      }, [props.regions]);
console.log(regions)
    return (
        <div>
              <div className="add-region">
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
                    <div className="region">{region.regions}</div>
                    <div className="actions">
                        <EditOutlined onClick={() => editRegion(region.id)} />
                        <DeleteOutlined onClick={() => deleteRegion(region.id)} />
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
        addRegions
        // addDocuments,
        // removeDocuments,
        // updateDocuments,
        // ClearReducerDataOfDocument,
        // searchDocumentsName,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Region);

// export default Region;