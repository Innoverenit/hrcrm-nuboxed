import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Popconfirm, Tooltip, Input } from "antd";
import { base_url } from "../../../../Config/Auth";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import AddIcon from '@mui/icons-material/Add';
import {
  getShipByData,
  getShipByCount,
  addShipBy,
  ClearReducerDataOfShipBy,
  searchShipByName,
  removeShipBy,
  updateShipBy
} from "../ShipBy/ShipByAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ShipBy = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [ShipByData, setShipByData] = useState(props.ShipByData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newShipByName, setShipByName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    props.getShipByData(props.orgId); 
    props.getShipByCount(props.orgId);
  }, []);

  const editRegion = (shipById, name) => {
    setEditingId(shipById);
    setShipByName(name); // Pre-fill the input field for editing.
    setError(''); // Clear error on edit.
  };

  const handleAddShipBy = () => {
    setAddingRegion(true);
    setShipByName(""); // Reset input for new entry.
    setError(''); // Clear any previous error.
  };

  const handleUpdateShipBy = (region) => {
    if (!newShipByName.trim()) {
      setError('ShipBy name is required.');
      return;
    }

    const data = {
      shipById: region.shipById,
      name: newShipByName
    };
    props.updateShipBy(data, region.shipById);
    setEditingId(null);
    setError('');
  };

  const handleShipBy = () => {
    if (!newShipByName.trim()) {
      setError('ShipBy name is required.');
      return;
    }

    const data = {
      name: newShipByName,
      orgId: props.orgId,
    };
    props.addShipBy(data, props.orgId);
    setAddingRegion(false);
    setError('');
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getShipByData(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchShipByName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setAddingRegion(false);
    setError(''); // Clear any error.
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError(''); // Clear any error.
  };

  useEffect(() => {
    if (props.ShipByData.length > 0) {
      setShipByData(props.ShipByData);
    }
  }, [props.ShipByData]);

  if (props.fetchingShipBy) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-1 mr-4">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[3rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"shipBy"}`}>
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
                style={{ border: "2px solid black", width: "54%" }}
                type="text"
                placeholder="Add ShipBy"
                value={newShipByName}
                onChange={(e) => setShipByName(e.target.value)}
              />
              {error && <div style={{ color: "red" }}>{error}</div>}
              <button onClick={handleShipBy} disabled={!newShipByName.trim()}>Save</button>
              <button onClick={handleCancelAdd}>Cancel</button>
            </div>
          ) : (
            <button style={{ backgroundColor: "tomato", color: "white" }} onClick={handleAddShipBy}>
              <AddIcon className="!text-icon" /> Add More
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingShipBy && ShipByData.length === 0 ? (
            <NodataFoundPage />
          ) : (
            ShipByData.slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((region) => (
                <div
                  key={region.shipById}
                  className="flex rounded ml-1 font-bold shadow border bg-white text-[#444] mt-1 p-2 justify-between items-center"
                >
                  {editingId === region.shipById ? (
                    <input
                      style={{ border: "2px solid black" }}
                      type="text"
                      placeholder="Update ShipBy"
                      value={newShipByName}
                      onChange={(e) => setShipByName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.name}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      )}
                    </div>
                  )}
                  <div>
                    {editingId === region.shipById ? (
                      <div>
                        <button onClick={() => handleUpdateShipBy(region)}>Save</button>
                        <button className="ml-4" onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <BorderColorIcon
                        className="!text-icon text-red-600 cursor-pointer"
                        onClick={() => editRegion(region.shipById, region.name)}
                      />
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeShipBy(region.shipById, props.orgId)}
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
        {dayjs(props.ShipByData && props.ShipByData.length && props.ShipByData[0].updationDate).format("YYYY-MM-DD")}{" "}
        by {props.ShipByData && props.ShipByData.length && props.ShipByData[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ shipBy, auth }) => ({
  addingShipBy: shipBy.addingShipBy,
  addingShipByError: shipBy.addingShipByError,
  ShipByData: shipBy.ShipByData,
  shipByCount: shipBy.shipByCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  removingShipBy: shipBy.removingShipBy,
  removingShipByError: shipBy.removingShipByError,
  fetchingShipBy: shipBy.fetchingShipBy,
  fetchingShipByError: shipBy.fetchingShipByError,
  updatingShipBy: shipBy.updatingShipBy,
  updatingShipByError: shipBy.updatingShipByError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipByData,
      getShipByCount,
      ClearReducerDataOfShipBy,
      searchShipByName,
      addShipBy,
      removeShipBy,
      updateShipBy,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipBy);
