import React, {  useEffect,lazy,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../Config/Auth";
import { Popconfirm,Input,Select,Tooltip } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getDocuments,
  getDocumentCount,
  addDocuments,
  removeDocuments,
  updateDocuments,
  linkTypeToggle,
  searchDocumentsName,
  ClearReducerDataOfDocument
} from "./DocumentsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const DocumentStatusToggle = lazy(() =>
  import("../Documents/Child/DocumentStatusToggle")
);

const Documents = (props) => {
  const [type, setType] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [documents, setDocumentData] = useState(props.documents);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newDocumentName, setDocumentName] = useState('');
  useEffect(() => {
      props.getDocuments(); 
      props.getDocumentCount(props.orgId) 
  }, [])

  const editRegion = (documentTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(documentTypeId);
      setDocumentName(name);
  };



  const handleAddDocument = () => {
      setAddingRegion(true);
      setDocumentName("")
  };

  const handleStageType = (value, documentTypeId) => {
    setType(value);
    let data = {
      userType: value,
      documentTypeId: documentTypeId, // Use the provided documentTypeId here
    };
    props.linkTypeToggle(data);
  };

  const handleUpdateDocument=(region)=>{
      console.log(region)
      let data={
        documentTypeId:region.documentTypeId,
        documentTypeName:newDocumentName
       
      }
props.updateDocuments(data,region.documentTypeId)
setEditingId(null);
  }

  const handleDocument = () => {
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
        documentTypeName:newDocumentName,
        orgId:props.orgId,
      }
      props.addDocuments(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getDocuments();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchDocumentsName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setDocumentName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.documents.length > 0) {
        
        setDocumentData(props.documents);
      }
    }, [props.documents]);

// console.log(regions)
if (props.fetchingDocuments) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mt-[0.75rem] mr-2"  >
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
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"documentType"}`}>
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
                          placeholder="Add Document"
                          value={newDocumentName} 
                          onChange={(e) => setDocumentName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleDocument}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddDocument}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <div className="!h-[69vh] !mt-2" >
          {!props.fetchingDocuments && documents.length === 0 ? <NodataFoundPage /> : documents.slice().sort((a, b) => a.documentTypeName.localeCompare(b.documentTypeName)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"  key={region.documentTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.documentTypeId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    value={newDocumentName}
                    placeholder="Update Document"
                    onChange={(e) => setDocumentName(e.target.value)}
                />
            ) : (
                <div  style={{width:"40%"}}>{region.documentTypeName}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
 {/* <div className="flex justify-between w-[34rem]"> */}
                  <div className="w-[30%]">
                  <Select
  style={{ width: "50%" }}
  onChange={(value) => handleStageType(value, region.documentTypeId)} // Pass region.documentTypeId here
  value={region.userType}
  placeholder="Select Entity"
>
  <option value="User">User</option>
  <option value="Customer">Customer</option>
  <option value="Supplier">Supplier</option>
  <option value="Investor">Investor</option>
</Select>
                  </div>
                  <div className=" w-[20%]">
                    <DocumentStatusToggle
                      editInd={region.editInd}
                      userType={region.userType}
                      mandatoryInd={region.mandatoryInd}
                      documentTypeName={region.documentTypeName}
                      documentTypeId={region.documentTypeId}
                    />
                  </div>
                 
                {/* </div> */}
            {/* Action buttons */}
            <div className="actions w-12" >
  {/* Edit button */}
  {editingId === region.documentTypeId ? (
    <div>
      <button onClick={() => handleUpdateDocument(region)}>Save</button>
      <button   onClick={cancelEdit}>Cancel</button>
    </div>
  ) : (
    <>
      {region.editInd && !region.mandatoryInd && (
        <BorderColorIcon  className=" !text-icon cursor-pointer text-red-500"
          
          onClick={() => editRegion(region.documentTypeId, region.documentTypeName)}
        />
      )}
      {region.editInd && !region.mandatoryInd && (
        <Tooltip title="Delete">
          <Popconfirm
            title="Do you want to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => props.removeDocuments(region.documentTypeId,props.orgId)}
          >
            <DeleteOutlined className=" cursor-pointer !text-icon text-red-600 "
              
            />
          </Popconfirm>
        </Tooltip>
      )}
    </>
  )}
</div>

        </div>
        ))}
        </div>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.documents && props.documents.length && props.documents[0].updationDate).format('YYYY-MM-DD')} by {props.documents && props.documents.length && props.documents[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ document ,auth}) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  documents: document.documents,
  documentCount:document.documentCount,
  orgId: auth.userDetails.organizationId,
  removingDocuments: document.removingDocuments,
  removingDocumentsError: document.removingDocumentsError,
    updatingDocuments: document.updatingDocuments,
    updatingDocumentsError: document.updatingDocumentsError,
  fetchingDocuments: document.fetchingDocuments,
  fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocuments,
      linkTypeToggle,
      getDocumentCount,
      addDocuments,
      removeDocuments,
      updateDocuments,
      ClearReducerDataOfDocument,
      searchDocumentsName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Documents);
