import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Tooltip, Button, Input } from "antd";
import dayjs from "dayjs";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { BundleLoader } from "../../../../Components/Placeholder";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add'; 
import {
  getInvestorList,
  handleInvestorImportModal,
  getInvestorCount,
  searchInvestorTypeName,
  ClearReducerDataOfInvestorType,
  addInvestorData,
  removeInvestor,
  updateInvestor
} from "../InvestorTab/InvestorListAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";
import AddInvestorImportModal from "./AddInvestorImportModal";

const InvestorList = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [investorListData, setInvestorListData] = useState(props.investorListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newInvestorName, setInvestorName] = useState('');
  
  useEffect(() => {
    props.getInvestorList(props.orgId); 
    props.getInvestorCount(props.orgId) 
  }, [])

  const editRegion = (investorCategoryId, name) => {
    setEditingId(investorCategoryId);
    setInvestorName(name);
  };

  const handleAddInvestor = () => {
    setAddingRegion(true);
    setInvestorName("");
  };

  const handleUpdateInvestor = (region) => {
    let data = {
      investorCategoryId: region.investorCategoryId,
      name: newInvestorName
    };
    props.updateInvestor(data, region.investorCategoryId);
    setEditingId(null);
  };

  const handleInvestor = () => {
    if (newInvestorName.trim() === "") {
      alert("Investor name cannot be empty");
      return; // Prevent saving if input is empty
    }

    let data = {
      name: newInvestorName,
      orgId: props.orgId,
    };

    props.addInvestorData(data, props.orgId);
    setAddingRegion(false);
    setInvestorName(""); // Clear the input after adding
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getInvestorList(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchInvestorTypeName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setInvestorName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.investorListData.length > 0) {
      setInvestorListData(props.investorListData);
    }
  }, [props.investorListData]);

  if (props.fetchingInvestorList) {
    return <div><BundleLoader /></div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-row justify-end items-center">
          <div className="flex w-[18vw] mr-3">
            <Input
              placeholder="Search by Name"
              style={{ width: "100%", marginLeft: "0.5rem" }}
              onPressEnter={handleSearch}
              onChange={handleChange}
            />
          </div>
          <div className="w-[2rem]">
            <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"investorCategory"}`}>
              <div className="circle-icon !text-base cursor-pointer text-[green]">
                <Tooltip placement="top" title="Download XL">
                  <DownloadIcon />
                </Tooltip>
              </div>
            </a>
          </div>
          <div className="w-[3rem]">
            <div className="circle-icon !text-base cursor-pointer text-[blue]">
              <Tooltip title="Upload XL">
                <FileUploadIcon onClick={() => props.handleInvestorImportModal(true)} />
              </Tooltip>
            </div>
          </div>
          <div className="add-region">
            {addingRegion ? (
              <div>
                <input
                  placeholder="Add Investor"
                  className="border-2 border-gray mr-1 ml-1"
                  type="text"
                  value={newInvestorName}
                  onChange={(e) => setInvestorName(e.target.value)}
                />
                <button
                  className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                  onClick={handleInvestor}
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
              <button style={{ backgroundColor: "tomato", color: "white" }} onClick={handleAddInvestor}>
                <AddIcon className="!text-icon" /> Add
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <MainWrapper className="!h-[65vh] !mt-2">
            {!props.fetchingInvestorList && investorListData.length === 0 ? (
              <NodataFoundPage />
            ) : (
              investorListData
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((region) => (
                  <div
                    className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                    key={region.investorCategoryId}
                  >
                    {editingId === region.investorCategoryId ? (
                      <input
                        placeholder="Update Investor"
                        style={{ border: "2px solid black" }}
                        type="text"
                        value={newInvestorName}
                        onChange={(e) => setInvestorName(e.target.value)}
                      />
                    ) : (
                      <div>
                        {region.name}
                        &nbsp;&nbsp;&nbsp;
                        {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && (
                          <span className="text-xs text-[tomato] font-bold">New</span>
                        )}
                      </div>
                    )}
                    <div>
                      {editingId === region.investorCategoryId ? (
                        <div>
                          <button onClick={() => handleUpdateInvestor(region)}>Save</button>
                          <button className="ml-4" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <BorderColorIcon
                          className="!text-icon text-red-600 cursor-pointer"
                          onClick={() => editRegion(region.investorCategoryId, region.name)}
                        />
                      )}

                      <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => props.removeInvestor(region.investorCategoryId, props.orgId)}
                      >
                        <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer" />
                      </Popconfirm>
                    </div>
                  </div>
                ))
            )}
          </MainWrapper>
        </div>

        <div className="font-bold">
          Updated on{" "}
          {dayjs(props.investorListData && props.investorListData.length && props.investorListData[0].updationDate).format(
            "YYYY-MM-DD"
          )}{" "}
          by{" "}
          {props.investorListData && props.investorListData.length && props.investorListData[0].updatedBy}
        </div>
      </div>

      <AddInvestorImportModal
        handleInvestorImportModal={props.handleInvestorImportModal}
        addInvestorImportModal={props.addInvestorImportModal}
      />
    </>
  );
};

const mapStateToProps = ({ investorList, auth }) => ({
  addingInvestorData: investorList.addingInvestorData,
  addingInvestorDataError: investorList.addingInvestorDataError,
  investorListData: investorList.investorListData,
  investorCount: investorList.investorCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  addInvestorImportModal: investorList.addInvestorImportModal,
  removingInvestor: investorList.removingInvestor,
  removingInvestorError: investorList.removingInvestorError,
  fetchingInvestorList: investorList.fetchingInvestorList,
  fetchingInvestorListError: investorList.fetchingInvestorListError,
  updatingInvestor: investorList.updatingInvestor,
  updatingInvestorError: investorList.updatingInvestorError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorList,
      getInvestorCount,
      searchInvestorTypeName,
      ClearReducerDataOfInvestorType,
      addInvestorData,
      removeInvestor,
      updateInvestor,
      handleInvestorImportModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorList);
