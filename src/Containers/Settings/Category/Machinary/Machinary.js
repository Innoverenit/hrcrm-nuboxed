import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import AddIcon from '@mui/icons-material/Add';
import {
  getMachinary,
  getMachinaryCount,
  addMachinary,
  searchMachinaryName,
  ClearReducerDataOfMachinary,
  removeMachinary,
  updateMachinary
} from "../Machinary/MachinaryAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const Machinary = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [machinaryListData, setMachinaryListData] = useState(props.machinaryListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newName, setName] = useState('');
  const [newDescriptionName, setDescriptionName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  useEffect(() => {
    props.getMachinary();
    props.getMachinaryCount();
  }, []);

  const editRegion = (machinaryId, name, description) => {
    setEditingId(machinaryId);
    setName(name);
    setDescriptionName(description);
  };

  const handleAddMachinary = () => {
    setAddingRegion(true);
    setName("");
    setDescriptionName("");
  };

  const handleUpdateMachinary = (region) => {
    if (newName.trim() === "") {
      setErrorMessage("Name is empty");
      return;
    }

    let data = {
      machinaryId: region.machinaryId,
      name: newName,
      description: newDescriptionName,
    };
    props.updateMachinary(data, region.machinaryId);
    setEditingId(null);
    setErrorMessage(''); // Clear error after successful update
  };

  const handleMachinary = () => {
    if (newName.trim() === "") {
      setErrorMessage("Name is empty");
      return;
    }

    let data = {
      name: newName,
      description: newDescriptionName,
      orgId: props.orgId,
    };
    props.addMachinary(data, props.orgId);
    setAddingRegion(false);
    setErrorMessage(''); // Clear error after successful save
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getMachinary();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchMachinaryName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setName('');
    setDescriptionName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.machinaryListData.length > 0) {
      setMachinaryListData(props.machinaryListData);
    }
  }, [props.machinaryListData]);

  if (props.fetchingMachinary) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-2 mr-2">
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
                className="border-2 border-gray mr-1 ml-1 w-[29%]"
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setName(e.target.value)}
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
                loading={props.addingMachinary}
                onClick={handleMachinary}
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
              onClick={handleAddMachinary}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingMachinary && machinaryListData.length === 0 ? (
            <NodataFoundPage />
          ) : (
            machinaryListData
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((region) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                  key={region.machinaryId}
                >
                  {editingId === region.machinaryId ? (
                    <input
                      placeholder="Update Name"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <div style={{ width: "13rem" }}>
                      {region.name}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}

                  {editingId === region.machinaryId ? (
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

                  <div>
                    {editingId === region.machinaryId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateMachinary(region)}
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
                        className="cursor-pointer !text-icon text-red-600"
                        onClick={() => editRegion(region.machinaryId, region.name, region.description)}
                      />
                    )}

                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeMachinary(region.machinaryId, props.orgId)}
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
        Updated on {dayjs(props.machinaryListData[0]?.updationDate).format("YYYY-MM-DD")} by {props.machinaryListData[0]?.updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ machinary, auth }) => ({
  addingMachinary: machinary.addingMachinary,
  addingMachinaryError: machinary.addingMachinaryError,
  machinaryListData: machinary.machinaryListData,
  machinaryCount: machinary.machinaryCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  removingMachinary: machinary.removingMachinary,
  removingMachinaryError: machinary.removingMachinaryError,
  fetchingMachinary: machinary.fetchingMachinary,
  fetchingMachinaryError: machinary.fetchingMachinaryError,
  updatingMachinary: machinary.updatingMachinary,
  updatingMachinaryError: machinary.updatingMachinaryError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMachinary,
      getMachinaryCount,
      ClearReducerDataOfMachinary,
      searchMachinaryName,
      addMachinary,
      removeMachinary,
      updateMachinary,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Machinary);
