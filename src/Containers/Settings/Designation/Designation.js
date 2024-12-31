import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm, Input, Tooltip } from "antd";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../Components/Placeholder";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import {
  getDesignations,
  getDesignationCount,
  addDesignations,
  removeDesignations,
  updateDesignations,
  searchDesignationName,
  ClearReducerDataOfDesignation
} from "./DesignationAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const Designation = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [designations, setDesignationsData] = useState(props.designations);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newDesignationName, setDesignationName] = useState('');
  const [error, setError] = useState(""); // Error state for validation

  useEffect(() => {
    props.getDesignations();
    props.getDesignationCount(props.orgId);
  }, []);

  const editRegion = (designationTypeId, name) => {
    setEditingId(designationTypeId);
    setDesignationName(name);
  };

  const handleAddDesignation = () => {
    setAddingRegion(true);
    setDesignationName("");
  };

  const handleUpdateDesignation = (region) => {
    let data = {
      designationTypeId: region.designationTypeId,
      designationType: newDesignationName
    };
    props.updateDesignations(data, region.designationTypeId);
    setEditingId(null);
  };

  const handleDesignation = () => {
    // Validate that the designation name is not empty
    if (newDesignationName.trim() === "") {
      setError("Designation name is required.");
      return; // Prevent save if the designation name is empty
    }

    // If validation passes, proceed with saving the designation
    setError(""); // Clear any previous error messages
    let data = {
      editInd: true,
      designationType: newDesignationName,
      orgId: props.orgId,
      editInd: true
    };
    props.addDesignations(data, props.orgId);
    setAddingRegion(false); // Hide the input field after saving
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getDesignations();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchDesignationName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setDesignationName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.designations.length > 0) {
      setDesignationsData(props.designations);
    }
  }, [props.designations]);

  if (props.fetchingDesignations) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw]">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="ml-2 mr-2">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"designation"}`}>
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
                placeholder="Add Designation"
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                value={newDesignationName}
                onChange={(e) => setDesignationName(e.target.value)}
              />
              {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if designation name is empty */}
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                loading={props.addingDesignations}
                onClick={handleDesignation}
              >
                Save
              </button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddDesignation}
            >
              Add More
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingDesignations && designations.length === 0 ? (
            <NodataFoundPage />
          ) : (
            designations
              .slice()
              .sort((a, b) => a.designationType.localeCompare(b.designationType))
              .map((region) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.designationTypeId}
                >
                  {editingId === region.designationTypeId ? (
                    <input
                      placeholder="Update Designation"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newDesignationName}
                      onChange={(e) => setDesignationName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.designationType}{" "}
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}

                  <div>
                    <div flex row>
                    {editingId === region.designationTypeId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md mr-1 ml-1"
                          onClick={() => handleUpdateDesignation(region)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-400 text-white border-none p-2.5 rounded-md mr-1 ml-1"
                          
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {region.editInd ? (
                          <BorderColorIcon
                            className="!text-icon text-red-600 cursor-pointer"
                            onClick={() => editRegion(region.designationTypeId, region.designationType)}
                          />
                        ) : null}
                      </>
                    )}

                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        props.removeDesignations(region.designationTypeId, props.orgId)
                      }
                    >
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                    </Popconfirm>
                  </div>
                    </div>
                </div>
              ))
          )}
        </MainWrapper>
      </div>

      <div className="font-bold">
        Updated on{" "}
        {dayjs(
          props.designations && props.designations.length && props.designations[0].updationDate
        ).format("YYYY-MM-DD")}{" "}
        by{" "}
        {props.designations && props.designations.length && props.designations[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ designations, auth }) => ({
  addingDesignations: designations.addingDesignations,
  addingDesignationsError: designations.addingDesignationsError,
  designations: designations.designations,
  orgId: auth.userDetails.organizationId,
  removingDesignations: designations.removingDesignations,
  removingDesignationsError: designations.removingDesignationsError,
  updatingDesignations: designations.updatingDesignations,
  updatingDesignationsError: designations.updatingDesignationsError,
  fetchingDesignations: designations.fetchingDesignations,
  fetchingDesignationsError: designations.fetchingDesignationsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDesignations,
      getDesignationCount,
      addDesignations,
      updateDesignations,
      searchDesignationName,
      removeDesignations,
      ClearReducerDataOfDesignation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Designation);
