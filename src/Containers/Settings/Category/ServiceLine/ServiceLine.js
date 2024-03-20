import React, { useState,useEffect } from 'react';
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Input} from "antd";
import {
    getServiceLine,
    addServiceLine,
     removeServiceLine,
     updateServiceLine,
     updateDepartmentService,
     searchServiceName
    // searchDocumentsName,
    // ClearReducerDataOfDocument
  } from "./ServiceLineAction";
  import { Switch } from 'antd';
  import {getDepartments} from "../../../Settings/Department/DepartmentAction";
import { BundleLoader } from '../../../../Components/Placeholder';

const data = [
    { id: 1, region: "Europe" },
    { id: 2, region: "Africa" },
    { id: 3, region: "Antartica" }
];
const demo = [
    {
      department: "Sales",
      id: "1",
      serviceInd: false
    },
    {
      department: "Management",
      id: "2",
      serviceInd: false
    }
  ];

const ServiceLine = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [departments, setDepartments] = useState(props.departments);
    const [serviceLine, setServiceLine] = useState(props.serviceLine);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newServiceLineName, setNewServiceLineName] = useState('');
    useEffect(() => {
        props.getServiceLine(props.organizationId);
        props.getDepartments()  
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
        setNewServiceLineName("")
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
        setAddingRegion(false)
    };
    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
      
    
        if (e.target.value.trim() === "") {
        //   setPage(pageNo + 1);
        props.getServiceLine(props.organizationId);
        //   props.ClearReducerDataOfLoad()
        }
      };

      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchServiceName(currentData);
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };

    const handleCancelAdd = () => {
        setNewServiceLineName('');
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    const handleServiceChange = (checked, index) => {
        const updatedDepartments = [...departments];
        console.log(updatedDepartments)
        updatedDepartments[index].serviceLineInd = checked;
        setDepartments(updatedDepartments);
        if (checked) {
            props.updateDepartmentService(updatedDepartments[index].departmentId,checked)
          console.log("liveInd:", checked, "id:", updatedDepartments[index].departmentId);
        }
      }
    useEffect(() => {
        
        if (props.serviceLine.length > 0) {
          
            setServiceLine(props.serviceLine);
        }
      }, [props.serviceLine]);
      useEffect(() => {
        
        if (props.departments.length > 0) {
          
            setDepartments(props.departments);
        }
      }, [props.departments]);
// console.log(regions)
if (props.fetchingServiceLine) {
  return <div><BundleLoader/></div>;
}
    return (
        <div>
        <div style={{display:"flex"}}>
             {departments.map((dept, index) => (
        <div key={index} style={{marginLeft:"15px"}}>
          <h2>{dept.departmentName}</h2>
          <Switch
            checked={dept.serviceLineInd}
            checkedChildren="Yes"
            unCheckedChildren="No"
            onChange={(checked) => handleServiceChange(checked, index)}
          />
        </div>
      ))}
      </div>
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
const mapStateToProps = ({ region,auth,serviceLines,departments  }) => ({
    serviceLine:serviceLines.serviceLine,
    departments: departments.departments,
    fetchingServiceLine:serviceLines.fetchingServiceLine,
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
        removeServiceLine,
        getDepartments,
        updateDepartmentService,
        searchServiceName
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