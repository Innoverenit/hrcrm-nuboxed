import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../Config/Auth";
import { Popconfirm, Input, Tooltip } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import {
  getShipperCategory,
  addShipperCategory,
  removeShipper
} from "../SettingsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const ShipperCategory = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [shipperCategory, setShipperCategory] = useState(props.shipperCategory);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCategoryName, setCategoryName] = useState('');

  useEffect(() => {
    props.getShipperCategory();
  }, []);

  const editRegion = (sectorId, name) => {
    setEditingId(sectorId);
    setCategoryName(name);
  };

  const handleAddSector = () => {
    setAddingRegion(true);
    setCategoryName("");
  };

  const handleUpdateSector = (region) => {
    let data = {
      sectorId: region.sectorId,
    };
    props.updateSectors(data, region.sectorId);
    setEditingId(null);
  };

  const handleSector = () => {
    if (newCategoryName.trim() === "") {
      alert("Category name cannot be empty");
      return;
    }

    let data = {
      shipperCatName: newCategoryName,
      orgId: props.orgId,
    };
    props.addShipperCategory(data);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getShipperCategory();
    }
  };

  const handleCancelAdd = () => {
    setCategoryName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.shipperCategory.length > 0) {
      setShipperCategory(props.shipperCategory);
    }
  }, [props.shipperCategory]);

  if (props.fetchingShipperCategory) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"sector"}`}>
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
                placeholder="Add ShipperCategory"
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                value={newCategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                loading={props.addingShipperCategory}
                onClick={handleSector}
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
              loading={props.addingShipperCategory}
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddSector}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingShipperCategory && shipperCategory.length === 0 ? (
            <NodataFoundPage />
          ) : (
            shipperCategory
              .slice()
              .sort((a, b) => a.shipperCatName.localeCompare(b.shipperCatName))
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.sectorId}
                >
                  {editingId === region.sectorId ? (
                    <input
                      placeholder="Update Sector"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.shipperCatName}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}

                  <div>
                    {editingId === region.sectorId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateSector(region)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <BorderColorIcon className="!text-icon text-red-600 cursor-pointer" />
                    )}

                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeShipper(region.shipperCategoryId)}
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
        {dayjs(props.shipperCategory && props.shipperCategory.length && props.shipperCategory[0].updationDate).format(
          "YYYY-MM-DD"
        )}{" "}
        by {props.shipperCategory && props.shipperCategory.length && props.shipperCategory[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sector, auth, settings }) => ({
  addingShipperCategory: settings.addingShipperCategory,
  addingShipperCategoryError: settings.addingShipperCategoryError,
  shipperCategory: settings.shipperCategory,
  sectorCount: sector.sectorCount,
  orgId: auth.userDetails.organizationId,
  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingShipperCategory: settings.fetchingShipperCategory,
  fetchingShipperCategoryError: settings.fetchingShipperCategoryError,
  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperCategory,
      addShipperCategory,
      removeShipper,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperCategory);
