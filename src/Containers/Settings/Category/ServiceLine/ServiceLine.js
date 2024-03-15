import React, { useState,useEffect } from 'react';
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getServiceLine,
    addServiceLine,
     removeServiceLine,
     updateServiceLine
    // searchDocumentsName,
    // ClearReducerDataOfDocument
  } from "./ServiceLineAction";

const data = [
    { id: 1, region: "Europe" },
    { id: 2, region: "Africa" },
    { id: 3, region: "Antartica" }
];

const ServiceLine = (props) => {
    const [serviceLine, setServiceLine] = useState(props.serviceLine);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newServiceLineName, setNewServiceLineName] = useState('');
    useEffect(() => {
        props.getServiceLine(props.organizationId);  
    }, [])

    const editRegion = (serviceLineId, serviceLineName) => {
        setEditingId(serviceLineId);
        setNewServiceLineName(serviceLineName);
    };

    // const deleteRegion = (id) => {
    //     const updatedRegions = regions.filter(region => region.id !== id);
    //     setServiceLine(updatedRegions);
    // };

    const handleAddRegion = () => {
        setAddingRegion(true);
    };

    const handleUpdateRegion=(region)=>{
        console.log(region)
        let data={
            serviceLineId:region.serviceLineId,
            serviceLineName:newServiceLineName
         
        }
 props.updateServiceLine(data,region.serviceLineId)
setEditingId(null);
    }

    const handleServiceLine = () => {
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
            serviceLineName:newServiceLineName,
        }
        props.addServiceLine(data)
    };

    const handleCancelAdd = () => {
        setNewServiceLineName('');
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    useEffect(() => {
        
        if (props.serviceLine.length > 0) {
          
            setServiceLine(props.serviceLine);
        }
      }, [props.serviceLine]);
// console.log(regions)
    return (
        <div>
              <div className="add-region">
                {addingRegion ? (
                    <div>
                        <input 
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newServiceLineName} 
                            onChange={(e) => setNewServiceLineName(e.target.value)} 
                        />
                        <button onClick={handleServiceLine}>Save</button>
                        <button onClick={handleCancelAdd}>Cancel</button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleAddRegion}> Add ServiceLine</button>
                )}
            </div>
            {serviceLine.map(region => (
              <div className="card9" key={region.serviceLineId}>
              {/* Region name display or input field */}
              {editingId === region.serviceLineId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newServiceLineName}
                      onChange={(e) => setNewServiceLineName(e.target.value)}
                  />
              ) : (
                  <div className="region">{region.serviceLineName}</div>
              )}

              {/* Action buttons */}
              <div className="actions">
                  {/* Edit button */}
                  {editingId === region.serviceLineId ? (
                      <div>
                          <button onClick={() => handleUpdateRegion(region)}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <EditOutlined onClick={() => editRegion(region.serviceLineId, region.serviceLineName)} />
                  )}

                  {/* Delete button */}
                  <DeleteOutlined 
                onClick={() => 
                    props.removeServiceLine(region.serviceLineId)
                 }
                   />
              </div>
          </div>
            ))}
        </div>
    );
};
const mapStateToProps = ({ region,auth,serviceLines  }) => ({
    serviceLine:serviceLines.serviceLine,
    // addingDocuments: document.addingDocuments,
    // addingDocumentsError: document.addingDocumentsError,
    // regions: region.regions,
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
        getServiceLine,
        addServiceLine,
        updateServiceLine,
        removeServiceLine
        // addRegions,
        // updateRegions,
        // addDocuments,
        // removeRegions
        // updateDocuments,
        // ClearReducerDataOfDocument,
        // searchDocumentsName,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ServiceLine);

// export default Region;