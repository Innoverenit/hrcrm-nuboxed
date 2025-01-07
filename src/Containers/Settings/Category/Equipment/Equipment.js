import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { base_url } from "../../../../Config/Auth";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Popconfirm, Tooltip, Input } from "antd";
import dayjs from "dayjs";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import {
  getEquipment,
  getEquipmentCount,
  addEquipment,
  searchEquipmentName,
  ClearReducerDataOfEquipment,
  removeEquipment,
  updateEquipment,
} from "../Equipment/EquipmentAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const Equipment = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [equipmentListData, setEquipmentListData] = useState(props.equipmentListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newEquipmentName, setEquipmentName] = useState("");
  const [newQuantityName, setQuantityName] = useState("");
  const [newDescriptionName, setDescriptionName] = useState("");

  useEffect(() => {
    props.getEquipment();
    props.getEquipmentCount();
  }, []);

  const editRegion = (equipmentId, name, quantity, description) => {
    setEditingId(equipmentId);
    setEquipmentName(name);
    setQuantityName(quantity);
    setDescriptionName(description);
  };

  const handleAddEquipment = () => {
    setAddingRegion(true);
    setEquipmentName("");
    setQuantityName("");
    setDescriptionName("");
  };

  const handleUpdateEquipment = (region) => {
    if (!newEquipmentName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    let data = {
      equipmentId: region.equipmentId,
      name: newEquipmentName,
      quantity: newQuantityName,
      description: newDescriptionName,
    };
    props.updateEquipment(data, region.equipmentId);
    setEditingId(null);
  };

  const handleEquipment = () => {
    if (!newEquipmentName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    let data = {
      name: newEquipmentName,
      quantity: newQuantityName,
      description: newDescriptionName,
      orgId: props.orgId,
    };
    props.addEquipment(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getEquipment();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchEquipmentName(currentData);
    } else {
      alert("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setEquipmentName("");
    setQuantityName("");
    setDescriptionName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.equipmentListData.length > 0) {
      setEquipmentListData(props.equipmentListData);
    }
  }, [props.equipmentListData]);

  if (props.fetchingEquipment) {
    return <div><BundleLoader /></div>;
  }

  return (
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
        <div className="add-region">
          {addingRegion ? (
            <div>
              <input
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Name"
                value={newEquipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
              />
              <input
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Quantity"
                value={newQuantityName}
                onChange={(e) => setQuantityName(e.target.value)}
              />
              <input
                placeholder="Description"
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                value={newDescriptionName}
                onChange={(e) => setDescriptionName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleEquipment}
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
            <button style={{ backgroundColor: "tomato", color: "white" }} onClick={handleAddEquipment}>
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingEquipment && equipmentListData.length === 0 ? (
            <NodataFoundPage />
          ) : (
            equipmentListData
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((region) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.equipmentId}
                >
                  {editingId === region.equipmentId ? (
                    <input
                      placeholder="Update Equipment"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newEquipmentName}
                      onChange={(e) => setEquipmentName(e.target.value)}
                    />
                  ) : (
                    <div style={{ width: "13rem" }}>
                      {region.name}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}
                  {editingId === region.equipmentId ? (
                    <input
                      placeholder="Update Quantity"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newQuantityName}
                      onChange={(e) => setQuantityName(e.target.value)}
                    />
                  ) : region.quantity > 0 ? (
                    <div style={{ width: "13rem" }}>{region.quantity}</div>
                  ) : null}
                  {editingId === region.equipmentId ? (
                    <input
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      placeholder="Description"
                      value={newDescriptionName}
                      onChange={(e) => setDescriptionName(e.target.value)}
                    />
                  ) : (
                    <div style={{ width: "39rem" }}>{region.description}</div>
                  )}
                  <div className="flex flex-row">
                    {editingId === region.equipmentId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateEquipment(region)}
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
                      <BorderColorIcon
                        className="!text-icon text-red-600 cursor-pointer"
                        onClick={() => editRegion(region.equipmentId, region.name, region.quantity, region.description)}
                      />
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeEquipment(region.equipmentId, props.orgId)}
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
        Updated on {dayjs(props.equipmentListData && props.equipmentListData.length && props.equipmentListData[0].updationDate).format("YYYY-MM-DD")} by{" "}
        {props.equipmentListData && props.equipmentListData.length && props.equipmentListData[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ equipment, auth }) => ({
  addingEquipment: equipment.addingEquipment,
  addingEquipmentError: equipment.addingEquipmentError,
  equipmentListData: equipment.equipmentListData,
  equipmentCount: equipment.equipmentCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  removingEquipment: equipment.removingEquipment,
  removingEquipmentError: equipment.removingEquipmentError,
  fetchingEquipment: equipment.fetchingEquipment,
  fetchingEquipmentError: equipment.fetchingEquipmentError,
  updatingEquipment: equipment.updatingEquipment,
  updatingEquipmentError: equipment.updatingEquipmentError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEquipment,
      getEquipmentCount,
      ClearReducerDataOfEquipment,
      searchEquipmentName,
      addEquipment,
      removeEquipment,
      updateEquipment,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Equipment);
