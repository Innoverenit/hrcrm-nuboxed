import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm, Input, Tooltip } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import AddIcon from '@mui/icons-material/Add';
import {
  getTalentRoles,
  getExternalRoleCount,
  addTalentRoles,
  ClearReducerDataOfRoleTalent,
  searchRoleTalentName,
  updateTalentRoles,
  removeTalentRole
} from "./RoleAction";
import { Select } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";

const { Option } = Select;

const RoleTalent = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [talentRoles, setRoteTalentData] = useState(props.talentRoles);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newRoleExternalName, setRoleExternalName] = useState('');
  const [error, setError] = useState(""); // Error state for validation

  useEffect(() => {
    props.getTalentRoles(props.orgId); 
    props.getExternalRoleCount(props.orgId); 
  }, []);

  const editRegion = (roleTypeExternalId, name) => {
    setEditingId(roleTypeExternalId);
    setRoleExternalName(name);
  };

  const handleAddRoleExt = () => {
    setAddingRegion(true);
    setRoleExternalName("");
  };

  const handleUpdateRoleExt = (region) => {
    let data = {
      roleTypeExternalId: region.roleTypeExternalId,
      roleType: newRoleExternalName
    };
    props.updateTalentRoles(data, region.roleTypeExternalId);
    setEditingId(null);
  };

  const handleRoleExt = () => {
    // Validate role name before saving
    if (newRoleExternalName.trim() === "") {
      setError("Role name is required."); // Show error if the field is empty
      return; // Prevent save if the role name is empty
    }

    // If validation passes, proceed with saving the role
    setError(""); // Clear any previous error messages
    let data = {
      roleType: newRoleExternalName,
      orgId: props.orgId
    };
    props.addTalentRoles(data, props.orgId);
    setAddingRegion(false); // Hide the input field after saving
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getTalentRoles(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchRoleTalentName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setRoleExternalName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.talentRoles.length > 0) {
      setRoteTalentData(props.talentRoles);
    }
  }, [props.talentRoles]);

  if (props.fetchingTalentRoles) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="mb-1 flex w-[18vw]">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="ml-2 mr-2">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"roleTypeExternal"}`}>
            <div className="circle-icon !text-base cursor-pointer text-[green]">
              <Tooltip placement="top" title="Download XL">
                <DownloadIcon />
              </Tooltip>
            </div>
          </a>
        </div>
        <div className="add-region justify-end">
          {addingRegion ? (
            <div>
              <input 
                placeholder="Add Role"
                className="border-2 border-gray mr-1 ml-1"
                type="text" 
                value={newRoleExternalName} 
                onChange={(e) => setRoleExternalName(e.target.value)} 
              />
              {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" 
                onClick={handleRoleExt}
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
              onClick={handleAddRoleExt}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <MainWrapper className="h-[69vh] mt-2">
          {!props.fetchingTalentRoles && talentRoles.length === 0 ? (
            <NodataFoundPage />
          ) : (
            talentRoles.slice().sort((a, b) => a.roleType.localeCompare(b.roleType)).map((region) => (
              <div className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" key={region.roleTypeExternalId}>
                {editingId === region.roleTypeExternalId ? (
                  <input
                    placeholder="Update Role"
                    className="border-2 border-gray mr-1 ml-1"
                    type="text"
                    value={newRoleExternalName}
                    onChange={(e) => setRoleExternalName(e.target.value)}
                  />
                ) : (
                  <div>{region.roleType} {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ? <span className="text-xs text-[tomato] font-bold">New</span> : null}</div>
                )}
                <div>
                  {editingId === region.roleTypeExternalId ? (
                    <div>
                      <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={() => handleUpdateRoleExt(region)}
                      >
                        Save
                      </button>
                      <button 
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <BorderColorIcon className="!text-icon text-red-600 cursor-pointer" onClick={() => editRegion(region.roleTypeExternalId, region.roleType)} />
                  )}
                  <Popconfirm
                    title="Do you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => props.removeTalentRole(region.roleTypeExternalId, props.orgId)}
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
        Updated on {dayjs(props.talentRoles && props.talentRoles.length && props.talentRoles[0].updationDate).format('YYYY-MM-DD')} by {props.talentRoles && props.talentRoles.length && props.talentRoles[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ role, auth }) => ({
  addingTalentRoles: role.addingTalentRoles,
  talentRoles: role.talentRoles,
  fetchingTalentRoles: role.fetchingTalentRoles,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTalentRoles,
      getExternalRoleCount,
      addTalentRoles,
      ClearReducerDataOfRoleTalent,
      searchRoleTalentName,
      updateTalentRoles,
      removeTalentRole,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RoleTalent);
