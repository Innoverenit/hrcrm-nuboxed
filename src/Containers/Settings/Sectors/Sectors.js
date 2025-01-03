import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from "@mui/icons-material/Download";
import { base_url } from "../../../Config/Auth";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, Input, Tooltip, message } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import AddIcon from "@mui/icons-material/Add";
import {
  getSectors,
  getSectorCount,
  addSectors,
  removeSectors,
  updateSectors,
  searchSectorName,
  ClearReducerDataOfSector,
} from "./SectorsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const Sectors = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [sectors, setSectorData] = useState(props.sectors);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newSectorName, setSectorName] = useState("");

  useEffect(() => {
    props.getSectors();
    props.getSectorCount(props.orgId);
  }, []);

  const editRegion = (sectorId, name) => {
    setEditingId(sectorId);
    setSectorName(name);
  };

  const handleAddSector = () => {
    setAddingRegion(true);
    setSectorName("");
  };

  const handleUpdateSector = (region) => {
    if (newSectorName.trim() === "") {
      message.error("Empty Sector. Please provide a value.");
      return;
    }

    let data = {
      sectorId: region.sectorId,
      sectorName: newSectorName,
    };
    props.updateSectors(data, region.sectorId);
    setEditingId(null);
  };

  const handleSector = () => {
    if (newSectorName.trim() === "") {
      message.error("Empty Sector. Please provide a value.");
      return;
    }

    let data = {
      sectorName: newSectorName,
      orgId: props.orgId,
    };
    props.addSectors(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getSectors();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchSectorName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setSectorName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.sectors.length > 0) {
      setSectorData(props.sectors);
    }
  }, [props.sectors]);

  if (props.fetchingSectors) {
    return (
      <div>
        <BundleLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-end">
        <div className="flex w-[18vw] mr-2 mt-[7px]">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=sector`}>
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
                placeholder="Add Sector"
                className="border-2 border-gray mr-1 ml-1 w-[55%]"
                type="text"
                value={newSectorName}
                onChange={(e) => setSectorName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleSector}>
                Save
              </button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}>
                Cancel
              </button>
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddSector}>
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingSectors && sectors.length === 0 ? (
            <NodataFoundPage />
          ) : (
            sectors.map((region) => (
              <div
                className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                key={region.sectorId}>
                {editingId === region.sectorId ? (
                  <input
                    placeholder="Update Sector"
                    className="border-2 border-gray mr-1 ml-1"
                    type="text"
                    value={newSectorName}
                    onChange={(e) => setSectorName(e.target.value)}
                  />
                ) : (
                  <div>
                    {region.sectorName}&nbsp;&nbsp;&nbsp;
                    {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && (
                      <span className="text-xs text-[tomato] font-bold">New</span>
                    )}
                  </div>
                )}
                <div>
                  {editingId === region.sectorId ? (
                    <div>
                      <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={() => handleUpdateSector(region)}>
                        Save
                      </button>
                      <button
                        className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <BorderColorIcon
                      className="!text-icon text-red-600 cursor-pointer"
                      onClick={() => editRegion(region.sectorId, region.sectorName)}
                    />
                  )}
                  <Popconfirm
                    title="Do you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => props.removeSectors(region.sectorId, props.orgId)}>
                    <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                  </Popconfirm>
                </div>
              </div>
            ))
          )}
        </MainWrapper>
      </div>
      <div className="font-bold">
        Updated on {dayjs(props.sectors?.[0]?.updationDate).format("YYYY-MM-DD")} by{" "}
        {props.sectors?.[0]?.name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sector, auth }) => ({
  addingSectors: sector.addingSectors,
  addingSectorsError: sector.addingSectorsError,
  sectors: sector.sectors,
  sectorCount: sector.sectorCount,
  orgId: auth.userDetails.organizationId,
  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingSectors: sector.fetchingSectors,
  fetchingSectorsError: sector.fetchingSectorsError,
  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSectorCount,
      getSectors,
      addSectors,
      removeSectors,
      updateSectors,
      searchSectorName,
      ClearReducerDataOfSector,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sectors);
