import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
import DownloadIcon from "@mui/icons-material/Download";
import { base_url } from "../../../Config/Auth";
import { Popconfirm, Input, Select, Tooltip } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import AddIcon from '@mui/icons-material/Add';
import {
  getDocuments,
  getDocumentCount,
  addDocuments,
  removeDocuments,
  updateDocuments,
  linkTypeToggle,
  searchDocumentsName,
  ClearReducerDataOfDocument,
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
  const [newDocumentName, setDocumentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    props.getDocuments();
    props.getDocumentCount(props.orgId);
  }, []);

  const editRegion = (documentTypeId, name) => {
    setEditingId(documentTypeId);
    setDocumentName(name);
  };

  const handleAddDocument = () => {
    setAddingRegion(true);
    setDocumentName("");
    setError("");
  };

  const handleStageType = (value, documentTypeId) => {
    setType(value);
    let data = {
      userType: value,
      documentTypeId: documentTypeId,
    };
    props.linkTypeToggle(data);
  };

  const handleUpdateDocument = (region) => {
    let data = {
      documentTypeId: region.documentTypeId,
      documentTypeName: newDocumentName,
    };
    props.updateDocuments(data, region.documentTypeId);
    setEditingId(null);
  };

  const handleDocument = () => {
    if (!newDocumentName.trim()) {
      setError("Document name cannot be empty.");
      return;
    }
    let data = {
      documentTypeName: newDocumentName,
      orgId: props.orgId,
    };
    props.addDocuments(data, props.orgId);
    setAddingRegion(false);
    setError("");
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getDocuments();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchDocumentsName(currentData);
    } else {
      console.error("Input is empty.");
    }
  };

  const handleCancelAdd = () => {
    setDocumentName("");
    setAddingRegion(false);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.documents.length > 0) {
      setDocumentData(props.documents);
    }
  }, [props.documents]);

  if (props.fetchingDocuments) {
    return (
      <div>
        <BundleLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-[0.75rem] mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a
            href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"documentType"}`}
          >
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
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Add Document"
                value={newDocumentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
              <button
              className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
              loading={props.addingItemTask} onClick={handleDocument}>
                Save
              </button>
              <button
              className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
              onClick={handleCancelAdd}>Cancel</button>
              {error && (
                <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
              )}
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddDocument}
            >
              <AddIcon className="!text-icon" /> Add  
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="!h-[69vh] !mt-2">
          {!props.fetchingDocuments && documents.length === 0 ? (
            <NodataFoundPage />
          ) : (
            documents
              .slice()
              .sort((a, b) =>
                a.documentTypeName.localeCompare(b.documentTypeName)
              )
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.documentTypeId}
                >
                  {editingId === region.documentTypeId ? (
                    <input
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newDocumentName}
                      placeholder="Update Document"
                      onChange={(e) => setDocumentName(e.target.value)}
                    />
                  ) : (
                    <div style={{ width: "40%" }}>
                      {region.documentTypeName}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">
                          New
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div className="w-[30%]">
                    <Select
                      style={{ width: "102%" }}
                      onChange={(value) =>
                        handleStageType(value, region.documentTypeId)
                      }
                      value={region.userType}
                      placeholder="Select Entity"
                      mode="multiple"
                    >
                      <option value="User">User</option>
                      <option value="Customer">Customer</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Investor">Investor</option>
                    </Select>
                  </div>
                  <div className="w-[20%]">
                    <DocumentStatusToggle
                      editInd={region.editInd}
                      userType={region.userType}
                      mandatoryInd={region.mandatoryInd}
                      documentTypeName={region.documentTypeName}
                      documentTypeId={region.documentTypeId}
                    />
                  </div>
                  <div className="actions w-12 justify-end">
                    {editingId === region.documentTypeId ? (
                      <div>
                        <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" 
                        onClick={() => handleUpdateDocument(region)}>
                          Save
                        </button>
                        <button
                        className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        {region.editInd && !region.mandatoryInd && (
                          <BorderColorIcon
                            className="!text-icon cursor-pointer text-red-500"
                            onClick={() =>
                              editRegion(
                                region.documentTypeId,
                                region.documentTypeName
                              )
                            }
                          />
                        )}
                        {region.editInd && !region.mandatoryInd && (
                          <Tooltip title="Delete">
                            <Popconfirm
                              title="Do you want to delete?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() =>
                                props.removeDocuments(
                                  region.documentTypeId,
                                  props.orgId
                                )
                              }
                            >
                              <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                            </Popconfirm>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(
          props.documents &&
            props.documents.length &&
            props.documents[0].updationDate
        ).format("YYYY-MM-DD")}{" "}
        by{" "}
        {props.documents && props.documents.length && props.documents[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ document, auth }) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  documents: document.documents,
  documentCount: document.documentCount,
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
