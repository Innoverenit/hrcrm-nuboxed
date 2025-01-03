import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm } from "antd";
import dayjs from "dayjs";
import { MainWrapper } from "../../../Components/UI/Layout";
import AddIcon from '@mui/icons-material/Add';
import {
  getUOM,
  getUOMCount,
  addUOM,
  removeUOM,
  updateUOM
} from "../SettingsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";

const UOM = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [UOMListData, setUOMListData] = useState(props.UOMListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newName, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.getUOM();
    props.getUOMCount();
  }, []);

  const handleaddUOM = () => {
    setAddingRegion(true);
    setName("");
    setErrorMessage("");
  };

  const handleMachinary = () => {
    if (!newName.trim()) {
      setErrorMessage("Name is empty");
      return;
    }
    setErrorMessage("");
    let data = {
      unitName: newName,
      orgId: props.orgId,
    };
    props.addUOM(data, props.orgId);
    setAddingRegion(false);
  };

  const editRegion = (uomId, unitName) => {
    setEditingId(uomId);
    setName(unitName);
    setErrorMessage("");
  };

  const handleupdateUOM = (region) => {
    if (!newName.trim()) {
      setErrorMessage("Name is empty");
      return;
    }
    setErrorMessage("");
    let data = {
      uomId: region.uomId,
      unitName: newName,
    };
    props.updateUOM(data, region.uomId);
    setEditingId(null);
  };

  const handleCancelAdd = () => {
    setName('');
    setAddingRegion(false);
    setErrorMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setErrorMessage("");
  };

  useEffect(() => {
    if (props.UOMListData.length > 0) {
      setUOMListData(props.UOMListData);
    }
  }, [props.UOMListData]);

  if (props.fetchingUOM) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="add-region">
          {addingRegion ? (
            <div>
              <input
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setName(e.target.value)}
              />
              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                loading={props.addingUOM}
                onClick={handleMachinary}>Save</button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}>Cancel</button>
            </div>
          ) : (
            <button style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleaddUOM}>
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingUOM && UOMListData.length === 0 ? (
            <NodataFoundPage />
          ) : (
            UOMListData.slice().sort((a, b) => a.unitName.localeCompare(b.unitName)).map((region) => (
              <div className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" key={region.uomId}>
                {editingId === region.uomId ? (
                  <>
                    <input
                      placeholder="Update Name"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newName}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                  </>
                ) : (
                  <div style={{ width: "13rem" }}>{region.unitName}&nbsp;&nbsp;&nbsp;
                    {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") &&
                      <span className="text-xs text-[tomato] font-bold">New</span>}
                  </div>
                )}
                <div>
                  {editingId === region.uomId ? (
                    <div>
                      <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={() => handleupdateUOM(region)}>Save</button>
                      <button
                        className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <BorderColorIcon className="cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.uomId, region.unitName)} />
                  )}
                  <Popconfirm
                    title="Do you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => props.removeUOM(region.uomId, props.orgId)}
                  >
                    <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                  </Popconfirm>
                </div>
              </div>
            ))
          )}
        </MainWrapper>
      </div>
      <div className="font-bold">Updated on {dayjs(props.UOMListData && props.UOMListData.length && props.UOMListData[0].updationDate).format('YYYY-MM-DD')} by {props.UOMListData && props.UOMListData.length && props.UOMListData[0].updatedBy}</div>
    </div>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
  addingUOM: settings.addingUOM,
  UOMListData: settings.UOMListData,
  orgId: auth.userDetails.organizationId,
  fetchingUOM: settings.fetchingUOM,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUOM,
      getUOMCount,
      addUOM,
      removeUOM,
      updateUOM,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UOM);
