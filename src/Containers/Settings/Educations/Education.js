import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { base_url } from "../../../Config/Auth";
import DownloadIcon from "@mui/icons-material/Download";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, Tooltip, message, Input } from "antd";
import AddIcon from "@mui/icons-material/Add"; 
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getEducations,
  getEducationCount,
  addEducations,
  removeEducation,
  updateEducations,
  searchEducationsName,
  ClearReducerDataOfEducation,
} from "./EducationAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const Education = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [educations, setEducationData] = useState(props.educations);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newEducationName, setEducationName] = useState("");

  useEffect(() => {
    props.getEducations();
    props.getEducationCount(props.orgId);
  }, []);

  const editRegion = (educationTypeId, name) => {
    setEditingId(educationTypeId);
    setEducationName(name);
  };

  const handleAddEducation = () => {
    setAddingRegion(true);
    setEducationName("");
  };

  const handleUpdateEducation = (region) => {
    let data = {
      educationTypeId: region.educationTypeId,
      educationType: newEducationName,
    };
    props.updateEducations(data, region.educationTypeId);
    setEditingId(null);
  };

  const handleEducation = () => {
    if (!newEducationName.trim()) {
      message.error("Add Education field is empty. Please provide a value.");
      return;
    }

    let data = {
      editInd: true,
      educationType: newEducationName,
      orgId: props.orgId,
    };

    props.addEducations(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getEducations();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchEducationsName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setEducationName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.educations.length > 0) {
      setEducationData(props.educations);
    }
  }, [props.educations]);

  if (props.fetchingEducations) {
    return <div><BundleLoader /></div>;
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
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"educationType"}`}>
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
                placeholder="Add Education"
                className="border-2 border-gray mr-1 ml-1 w-[52%]" 
                type="text"
                value={newEducationName}
                onChange={(e) => setEducationName(e.target.value)}
              />
              <button
              className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" 
                loading={props.addingIdProofs}
                onClick={handleEducation}
              >
                Save
              </button>
              <button
              className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
              onClick={handleCancelAdd}>Cancel</button>
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddEducation}
            >
              <AddIcon className="!text-icon" /> Add 
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingEducations && educations.length === 0 ? (
            <NodataFoundPage />
          ) : (
            educations
              .slice()
              .sort((a, b) => a.educationType.localeCompare(b.educationType))
              .map((region) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.educationTypeId}
                >
                  {editingId === region.educationTypeId ? (
                    <input
                      placeholder="Update Education"
                      style={{ border: "2px solid gray" }}
                      type="text"
                      value={newEducationName}
                      onChange={(e) => setEducationName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.educationType}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">
                          New
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div>
                    {editingId === region.educationTypeId ? (
                      <div>
                        <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" 
                        onClick={() => handleUpdateEducation(region)}>Save</button>
                        <button 
                        className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" 
                        onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        {region.editInd ? (
                          <BorderColorIcon
                            className="cursor-pointer !text-icon text-red-600"
                            onClick={() => editRegion(region.educationTypeId, region.educationType)}
                          />
                        ) : null}
                      </>
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        props.removeEducation(region.educationTypeId, props.orgId)
                      }
                    >
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                    </Popconfirm>
                  </div>
                </div>
              ))
          )}
        </MainWrapper>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(props.educations && props.educations.length && props.educations[0].updationDate).format("YYYY-MM-DD")}{" "}
        by {props.educations && props.educations.length && props.educations[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ education, auth }) => ({
  addingEducations: education.addingEducations,
  addingEducationsError: education.addingEducationsError,
  educations: education.educations,
  educationCount: education.educationCount,
  orgId: auth.userDetails.organizationId,
  removingEducations: education.removingEducations,
  removingEducationsError: education.removingEducationsError,
  fetchingEducations: education.fetchingEducations,
  fetchingEducationsError: education.fetchingEducationsError,
  updatingEducations: education.updatingEducations,
  updatingEducationsError: education.updatingEducationsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducations,
      getEducationCount,
      addEducations,
      removeEducation,
      updateEducations,
      searchEducationsName,
      ClearReducerDataOfEducation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Education);
