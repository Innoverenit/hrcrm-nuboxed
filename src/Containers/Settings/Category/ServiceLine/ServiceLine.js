import React, { useState,useEffect } from 'react';
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../Config/Auth";
import dayjs from "dayjs";
import { Tooltip, Input} from "antd";
import {
    getServiceLine,
    getServiceLineCount,
    addServiceLine,
     removeServiceLine,
     updateServiceLine,
     updateDepartmentService,
     searchServiceName
    // searchDocumentsName,
    // ClearReducerDataOfDocument
  } from "./ServiceLineAction";
  import { Switch,Popconfirm } from 'antd';
  import {getDepartments} from "../../../Settings/Department/DepartmentAction";
import { BundleLoader } from '../../../../Components/Placeholder';
import { MainWrapper } from '../../../../Components/UI/Layout';

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
        props.getServiceLineCount(props.Id);
        props.getDepartments()  
    }, [])

    const editRegion = (serviceLineId, serviceLineName) => {
      console.log(serviceLineName)
      console.log(serviceLineName)
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
        props.addServiceLine(data,props.orgId)
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
            <div class="w-[18rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"serviceLine"}`}>
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
            <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
            {serviceLine.map(region => (
              <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8" key={region.serviceLineId}>
              {/* Region name display or input field */}
              {editingId === region.serviceLineId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newServiceLineName}
                      onChange={(e) => setNewServiceLineName(e.target.value)}
                  />
              ) : (
                  <div >{region.serviceLineName}</div>
              )}

              {/* Action buttons */}
              <div>
                  {/* Edit button */}
                  {editingId === region.serviceLineId ? (
                      <div>
                          <button onClick={() => handleUpdateRegion(region)}>Save</button>
                          <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <EditOutlined  className=" cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.serviceLineId, region.serviceLineName)} 
                      
                      />
                  )}

                  {/* Delete button */}
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() =>  props.removeServiceLine(region.serviceLineId,props.orgId)}
                        >
                  <DeleteOutlined className=" cursor-pointer !text-icon text-red-600"
                    
                // onClick={() => 
                //     props.removeServiceLine(region.serviceLineId)
                //  }
                   />
                   </Popconfirm>
              </div>
          </div>
            ))}
            </MainWrapper>
            </div>
             <div class=" font-bold">Updated on {dayjs(props.serviceLine && props.serviceLine.length && props.serviceLine[0].updationDate).format('YYYY-MM-DD')} by {props.serviceLine && props.serviceLine.length && props.serviceLine[0].updatedBy}</div>
        </div>
    );
};
const mapStateToProps = ({ region,auth,serviceLines,departments  }) => ({
    serviceLine:serviceLines.serviceLine,
    departments: departments.departments,
    serviceLineCount:serviceLines.serviceLineCount,
    fetchingServiceLine:serviceLines.fetchingServiceLine,
    // addingDocuments: document.addingDocuments,
    // addingDocumentsError: document.addingDocumentsError,
    // regions: region.regions,
     organizationId: auth.userDetails.organizationId,
     orgId: auth.userDetails.organizationId,
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
        getServiceLineCount,
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