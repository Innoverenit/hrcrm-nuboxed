import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { Popconfirm, Tooltip, Input } from "antd";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../Components/Placeholder";
import AddIcon from '@mui/icons-material/Add';
import {
  getIdProofs,
  getIdProofCount,
  addIdProofs,
  removeIdProof,
  updateIdProofs,
  searchIdProofName,
  ClearReducerDataOfIdproof,
} from "./IdProofAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
const SingleIdProof = lazy(() => import("./SingleIdProof"));

const IdProofs = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [idProofs, setIdProofData] = useState(props.idProofs);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newIdProofName, setIdProofName] = useState("");

  useEffect(() => {
    props.getIdProofs();
    props.getIdProofCount(props.orgId);
  }, []);

  const editRegion = (idProofTypeId, name) => {
    setEditingId(idProofTypeId);
    setIdProofName(name);
  };

  const handleAddIdProof = () => {
    setAddingRegion(true);
    setIdProofName("");
  };

  const handleUpdateIdProof = (region) => {
    if (!newIdProofName.trim()) {
      console.error("Identity name cannot be empty. Please provide a valid name.");
      return;
    }
    const data = {
      idProofTypeId: region.idProofTypeId,
      idProofType: newIdProofName,
      editInd: true,
    };
    props.updateIdProofs(data, region.idProofTypeId);
    setEditingId(null);
  };

  const handleIdProof = () => {
    if (!newIdProofName.trim()) {
      console.error("Identity name cannot be empty.");
      return;
    }
    const data = {
      idProofType: newIdProofName.trim(),
      orgId: props.orgId,
      editInd: true,
    };
    props.addIdProofs(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getIdProofs();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchIdProofName(currentData);
    } else {
      console.error("Input is empty.");
    }
  };

  const handleCancelAdd = () => {
    setIdProofName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.idProofs.length > 0) {
      setIdProofData(props.idProofs);
    }
  }, [props.idProofs]);

  if (props.fetchingIdProofs) {
    return (
      <div>
        <BundleLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-7px mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"idProofType"}`}>
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
                placeholder="Add Identity"
                style={{ border: "2px solid black", width: "50%" }}
                type="text"
                value={newIdProofName}
                onChange={(e) => setIdProofName(e.target.value)}
              />
              <button
              className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
              loading={props.addingIdProofs} onClick={handleIdProof}>
                Save
              </button>
              <button 
              className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
              onClick={handleCancelAdd}>Cancel</button>
              
              {newIdProofName && (
                <div style={{ color: "red", marginTop: "5px" }}>{newIdProofName}</div>
              )}
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddIdProof}
            >
              <AddIcon className="!text-icon" /> Add  
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="!h-[69vh] !mt-2">
          {!props.fetchingIdProofs && idProofs.length === 0 ? (
            <NodataFoundPage />
          ) : (
            idProofs
              .slice()
              .sort((a, b) => a.idProofType.localeCompare(b.idProofType))
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.idProofTypeId}
                >
                  {editingId === region.idProofTypeId ? (
                    <input
                      placeholder="Update Identity"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newIdProofName}
                      onChange={(e) => setIdProofName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.idProofType}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">
                          New
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div>
                    {editingId === region.idProofTypeId ? (
                      <div>
                        <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={() => handleUpdateIdProof(region)}>
                          Save
                        </button>
                        <button
                        className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {region.editInd ? (
                          <BorderColorIcon
                            className="!text-icon cursor-pointer text-red-600"
                            onClick={() =>
                              editRegion(region.idProofTypeId, region.idProofType)
                            }
                          />
                        ) : null}
                      </>
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        props.removeIdProof(region.idProofTypeId, props.orgId)
                      }
                    >
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                    </Popconfirm>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(
          props.idProofs && props.idProofs.length && props.idProofs[0].updationDate
        ).format("YYYY-MM-DD")}{" "}
        by {props.idProofs && props.idProofs.length && props.idProofs[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ idProof, auth }) => ({
  addingIdProofs: idProof.addingIdProofs,
  idProofCount: idProof.idProofCount,
  orgId: auth.userDetails.organizationId,
  addingIdProofsError: idProof.addingIdProofsError,
  idProofs: idProof.idProofs,
  fetchingIdProofs: idProof.fetchingIdProofs,
  fetchingIdProofsError: idProof.fetchingIdProofsError,
  updatingIdProofs: idProof.updatingIdProofs,
  updatingIdProofsError: idProof.updatingIdProofsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIdProofs,
      getIdProofCount,
      addIdProofs,
      updateIdProofs,
      searchIdProofName,
      removeIdProof,
      ClearReducerDataOfIdproof,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(IdProofs);
