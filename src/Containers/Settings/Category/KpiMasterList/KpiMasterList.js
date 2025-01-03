import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Tooltip, Input } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import AddIcon from '@mui/icons-material/Add';
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  getMasterKpi,
  getMasterKpiCount,
  addMasterKpi,
  removeMasterKpi,
  updateMasterKpi,
  searchMasterKpiName,
  ClearReducerDataOfMasterKpi
} from "../KpiMasterList/KpiMasterListAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";
import PerformaneCurrencyToggle from "./PerformaneCurrencyToggle";

const KpiMasterList = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [masterKpiList, setMasterListData] = useState(props.masterKpiList);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newMasterKpiName, setMasterKpiName] = useState('');

  useEffect(() => {
    props.getMasterKpi(props.orgId);
    props.getMasterKpiCount(props.orgId);
  }, []);

  const editRegion = (performanceManagementId, name) => {
    setEditingId(performanceManagementId);
    setMasterKpiName(name);
  };

  const handleAddMasterKpi = () => {
    setAddingRegion(true);
    setMasterKpiName("");
  };

  const handleUpdateMasterKpi = (region) => {
    let data = {
      performanceManagementId: region.performanceManagementId,
      kpi: newMasterKpiName
    };
    props.updateMasterKpi(data, region.performanceManagementId);
    setEditingId(null);
  };

  const handleMasterKpi = () => {
    if (newMasterKpiName.trim() === "") {
      alert("KPI cannot be empty"); // Show error message if KPI name is empty
      return; // Prevent saving if the KPI name is empty
    }

    let data = {
      kpi: newMasterKpiName,
      orgId: props.orgId,
    };
    props.addMasterKpi(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getMasterKpi(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchMasterKpiName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setMasterKpiName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.masterKpiList.length > 0) {
      setMasterListData(props.masterKpiList);
    }
  }, [props.masterKpiList]);

  if (props.fetchingMasterKpi) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-3 mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"performanceManagement"}`}>
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
                placeholder="Add KPI"
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                value={newMasterKpiName}
                onChange={(e) => setMasterKpiName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                loading={props.addingMasterKpi}
                onClick={handleMasterKpi}>Save</button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}>Cancel</button>
            </div>
          ) : (
            <button style={{ backgroundColor: "tomato", color: "white" }} onClick={handleAddMasterKpi}>
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <MainWrapper className="!h-[65vh] !mt-2">
          {!props.fetchingMasterKpi && masterKpiList.length === 0 ? <NodataFoundPage /> : masterKpiList.slice().sort((a, b) => a.kpi.localeCompare(b.kpi)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-12 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" key={region.performanceManagementId}>
              <div className="flex flex-row">
                {editingId === region.performanceManagementId ? (
                  <input
                    placeholder="Update KPI"
                    className="border-2 border-gray mr-1 ml-1"
                    type="text"
                    value={newMasterKpiName}
                    onChange={(e) => setMasterKpiName(e.target.value)}
                  />
                ) : (
                  <div className="w-[10rem]">
                    {region.kpi}
                    {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ? 
                      <span className="text-xs text-[tomato] font-bold">New</span> : null}
                  </div>
                )}
                <div className="w-[40rem]">
                  <div className="text-sm font-medium font-poppins">Currency</div>
                  <PerformaneCurrencyToggle
                    kpi={region.kpi}
                    currencyInd={region.currencyInd}
                    region={region}
                    performanceManagementId={region.performanceManagementId}
                  />
                </div>
              </div>

              <div>
                {editingId === region.performanceManagementId ? (
                  <div>
                    <button className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                      onClick={() => handleUpdateMasterKpi(region)}>Save</button>
                    <button className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                      onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <BorderColorIcon className="cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.performanceManagementId, region.kpi)} />
                )}

                <Popconfirm
                  title="Do you want to delete?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => props.removeMasterKpi(region.performanceManagementId, props.orgId)}
                >
                  <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                </Popconfirm>
              </div>
            </div>
          ))}
        </MainWrapper>
      </div>

      <div className="font-bold">
        Updated on {dayjs(props.masterKpiList && props.masterKpiList.length && props.masterKpiList[0].updationDate).format('YYYY-MM-DD')} by {props.masterKpiList && props.masterKpiList.length && props.masterKpiList[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ masterKpi, auth }) => ({
  addingMasterKpi: masterKpi.addingMasterKpi,
  addingMasterKpiError: masterKpi.addingMasterKpiError,
  masterKpiList: masterKpi.masterKpiList,
  masterKpiCount: masterKpi.masterKpiCount,
  orgId: auth.userDetails.organizationId,
  removingMasterKpi: masterKpi.removingMasterKpi,
  removingMasterKpiError: masterKpi.removingMasterKpiError,
  fetchingMasterKpi: masterKpi.fetchingMasterKpi,
  fetchingMasterKpiError: masterKpi.fetchingMasterKpiError,
  updatingMasterKpi: masterKpi.updatingMasterKpi,
  updatingMasterKpiError: masterKpi.updatingMasterKpiError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMasterKpiCount,
      getMasterKpi,
      addMasterKpi,
      removeMasterKpi,
      updateMasterKpi,
      searchMasterKpiName,
      ClearReducerDataOfMasterKpi
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(KpiMasterList);
