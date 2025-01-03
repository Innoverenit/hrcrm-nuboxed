import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Tooltip, Input, message } from "antd";
import { base_url } from "../../../../Config/Auth";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import {
  getCustomer,
  getCustomerCount,
  addCustomer,
  searchCustomerName,
  ClearReducerDataOfCustomer,
  removeCustomer,
  updateCustomer
} from "./CustomerAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";

const Customer = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [customerListData, setCustomerData] = useState(props.customerListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCustomerName, setCustomerName] = useState('');

  useEffect(() => {
    props.getCustomer(props.orgId);
    props.getCustomerCount(props.orgId);
  }, []);

  const editRegion = (customerTypeId, name) => {
    setEditingId(customerTypeId);
    setCustomerName(name);
  };

  const handleAddCustomer = () => {
    setAddingRegion(true);
    setCustomerName("");
  };

  const handleUpdateCustomer = (region) => {
    let data = {
      customerTypeId: region.customerTypeId,
      name: newCustomerName
    };
    props.updateCustomer(data, region.customerTypeId);
    setEditingId(null);
  };

  const handleCustomer = () => {
    if (newCustomerName.trim() === '') {
      message.error("Empty Type. Please provide a value.");
      return;
    }

    let data = {
      name: newCustomerName,
      orgId: props.orgId,
    };
    props.addCustomer(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getCustomer(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchCustomerName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setCustomerName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.customerListData.length > 0) {
      setCustomerData(props.customerListData);
    }
  }, [props.customerListData]);

  if (props.fetchingCustomer) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-[7px] mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=customerType`}>
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
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Add Type"
                value={newCustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCustomer}>
                Save
              </button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}>
                Cancel
              </button>
            </div>
          ) : (
            <button style={{ backgroundColor: "tomato", color: "white" }} onClick={handleAddCustomer}>
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingCustomer && customerListData.length === 0 ? (
            <NodataFoundPage />
          ) : (
            customerListData
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.customerTypeId}
                >
                  {editingId === region.customerTypeId ? (
                    <input
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newCustomerName}
                      placeholder="Update Type"
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.name}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}
                  <div>
                    {editingId === region.customerTypeId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateCustomer(region)}>
                          Save
                        </button>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={cancelEdit}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <BorderColorIcon
                        className="!text-icon text-red-600 cursor-pointer"
                        onClick={() => editRegion(region.customerTypeId, region.name)}
                      />
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeCustomer(region.customerTypeId, props.orgId)}
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
        Updated on {dayjs(props.customerListData?.[0]?.updationDate).format('YYYY-MM-DD')} by{" "}
        {props.customerListData?.[0]?.updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ catgCustomer, auth }) => ({
  addingCustomer: catgCustomer.addingCustomer,
  addingCustomerError: catgCustomer.addingCustomerError,
  customerListData: catgCustomer.customerListData,
  orgId: auth.userDetails.organizationId,
  customerCount: catgCustomer.customerCount,
  userId: auth.userDetails.userId,
  removingCustomer: catgCustomer.removingCustomer,
  removingCustomerError: catgCustomer.removingCustomerError,
  fetchingCustomer: catgCustomer.fetchingCustomer,
  fetchingCustomerError: catgCustomer.fetchingCustomerError,
  updatingCustomer: catgCustomer.updatingCustomer,
  updatingCustomerError: catgCustomer.updatingCustomerError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomer,
      getCustomerCount,
      ClearReducerDataOfCustomer,
      searchCustomerName,
      addCustomer,
      removeCustomer,
      updateCustomer,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
