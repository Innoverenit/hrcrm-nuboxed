import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { base_url } from "../../../../Config/Auth";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Popconfirm, Tooltip, Input } from "antd";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import AddIcon from '@mui/icons-material/Add';
import {
    getIndustry,
    getIndustryCount,
    addIndustry,
    searchIndustryName,
    ClearReducerDataOfIndustry,
    removeIndustry,
    updateIndustry
} from "../Industry/IndustryAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import CountryStatusToggle from "../Country/CountryStatusToggle";
import IndustryStatusToggle from "./IndustryStatusToggle";

const Industry = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [industryListData, setIndustryListData] = useState(props.industryListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newIndustryName, setIndustryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.getIndustry(props.orgId); 
    props.getIndustryCount(props.orgId) 
  }, [])

  const editRegion = (industryId, name) => {
    setEditingId(industryId);
    setIndustryName(name);
  };

  const handleAddIndustry = () => {
    setAddingRegion(true);
    setIndustryName("");
    setErrorMessage('');
  };

  const handleUpdateIndustry = (region) => {
    if (!newIndustryName.trim()) {
      setErrorMessage('Empty industry name');
      return;
    }

    let data = {
      industryId: region.industryId,
      name: newIndustryName
    };

    props.updateIndustry(data, region.industryId);
    setEditingId(null);
    setErrorMessage('');
  };

  const handleIndustry = () => {
    if (!newIndustryName.trim()) {
      setErrorMessage('Empty industry name');
      return;
    }

    let data = {
      name: newIndustryName,
      orgId: props.orgId,
    };
    props.addIndustry(data, props.orgId);
    setAddingRegion(false);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getIndustry(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchIndustryName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setIndustryName('');
    setAddingRegion(false);
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setErrorMessage('');
  };

  useEffect(() => {
    if (props.industryListData.length > 0) {
      setIndustryListData(props.industryListData);
    }
  }, [props.industryListData]);

  if (props.fetchingIndustry) {
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

        <div className="add-region">
          {addingRegion ? (
            <div>
              <input 
                className="border-2 border-gray mr-1 ml-1 w-[53%]"
                type="text" 
                placeholder="Add Industry"
                value={newIndustryName} 
                onChange={(e) => setIndustryName(e.target.value)} 
              />
              <button 
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                loading={props.addingEquipment}
                onClick={handleIndustry}>Save</button>
              <button 
                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleCancelAdd}>Cancel</button>
            </div>
          ) : (
            <button style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddIndustry}> 
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="error-message text-red-600">{errorMessage}</div>
      )}

      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingIndustry && industryListData.length === 0 
            ? <NodataFoundPage /> 
            : industryListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-12 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" key={region.industryId}>
              {editingId === region.industryId ? (
                <input
                  placeholder="Update Industry"
                  style={{ border: "2px solid black" }}
                  type="text"
                  value={newIndustryName}
                  onChange={(e) => setIndustryName(e.target.value)}
                />
              ) : (
                <div>
                  {region.name}
                  {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && (
                    <span className="text-xs text-[tomato] font-bold">New</span>
                  )}
                </div>
              )}

              <div className="flex font-medium flex-col md:w-[34rem] max-sm:justify-between w-full max-sm:flex-row">
                <div className="text-sm font-medium font-poppins">Industry</div>
                <div className="font-normal text-sm font-poppins">
                  <div className="w-2/6">
                    <IndustryStatusToggle />
                  </div>
                </div>
              </div>

              <div className="actions">
                {editingId === region.industryId ? (
                  <div>
                    <button className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" onClick={() => handleUpdateIndustry(region)}>Save</button>
                    <button className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <BorderColorIcon className="cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.industryId, region.name)} />
                )}

                <Popconfirm
                  title="Do you want to delete?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => props.removeIndustry(region.industryId, props.orgId)}
                >
                  <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                </Popconfirm>
              </div>
            </div>
          ))}
        </MainWrapper>
      </div>

      <div className="font-bold">
        Updated on {dayjs(props.industryListData && props.industryListData.length && props.industryListData[0].updationDate).format('YYYY-MM-DD')} by {props.industryListData && props.industryListData.length && props.industryListData[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ industry, auth }) => ({
  addingEquipment: industry.addingEquipment,
  addingEquipmentError: industry.addingEquipmentError,
  industryListData: industry.industryListData,
  industryCount: industry.industryCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  removingEquipment: industry.removingEquipment,
  removingEquipmentError: industry.removingEquipmentError,
  fetchingIndustry: industry.fetchingIndustry,
  fetchingIndustryError: industry.fetchingIndustryError,
  updatingEquipment: industry.updatingEquipment,
  updatingEquipmentError: industry.updatingEquipmentError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getIndustry,
    getIndustryCount,
    ClearReducerDataOfIndustry,
    searchIndustryName,
    addIndustry,
    removeIndustry,
    updateIndustry,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Industry);
