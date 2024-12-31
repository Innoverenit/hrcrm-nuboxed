import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm, Tooltip, Input } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import {
  getRoles,
  getRoleCount,
  addRoles,
  updateRoles,
  searchRoleName,
  removeRole,
  ClearReducerDataOfRole
} from "./RoleAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import * as Yup from "yup";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { getDepartments } from "../../Department/DepartmentAction";
import { Select } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Number is too short").max(10, "Number is too long"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5, "Number is too short").max(10, "Number is too long"),
  departmentName: Yup.string().required("Input needed!"),
});

const Role = (props) => {
  const [selectedDept, setSelectedDept] = useState("");
  const [error, setError] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [roles, setRoleData] = useState(props.roles);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newRoleName, setRoleName] = useState('');

  useEffect(() => {
    props.getRoles(props.organizationId);
    props.getDepartments();
    props.getRoleCount(props.orgId)
  }, [])

  const editRegion = (roleTypeId, name, department) => {
    setEditingId(roleTypeId);
    setRoleName(name);
    setSelectedDept(department);
  };

  const handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    setSelectedDept(selectedDept);
  };

  const handleAddRole = () => {
    setAddingRegion(true);
    setRoleName("")
  };

  const handleUpdateRole = (region) => {
    let data = {
      roleTypeId: region.roleTypeId,
      organizationId: props.organizationId,
      userId: props.userId,
      roleType: newRoleName,
      departmentId: selectedDept,
    }
    props.updateRoles(data, region.roleTypeId);
    setEditingId(null);
  }

  const handleRole = () => {
    // Check if the role name and department are both filled
    if (!newRoleName.trim()) {
      setError("Role name is required.");
      return; // Prevent saving if role name is empty
    }

    if (!selectedDept) {
      setError("Department is required.");
      return; // Prevent saving if department is not selected
    }

    // If both fields are valid, proceed with the save
    setError(""); // Clear previous errors
    let data = {
      roleType: newRoleName,
      organizationId: props.organizationId,
      userId: props.userId,
      department: selectedDept,
    }

    props.addRoles(data, props.organizationId);
    setAddingRegion(false); // Hide the add role form
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getRoles(props.organizationId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchRoleName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setRoleName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.roles.length > 0) {
      setRoleData(props.roles);
    }
  }, [props.roles]);

  if (props.fetchingRoles) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw]">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="ml-2 mr-2">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"roleType"}`}>
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
                placeholder="Add Role"
                className="border-2 border-gray w-[35%]"
                type="text"
                value={newRoleName}
                onChange={(e) => setRoleName(e.target.value)}
              />

              <select
                className="customize-select"
                onChange={handleDeptChange}
              >
                <option value="">Select Department</option>
                {props.departments.map((item) => (
                  <option key={item.departmentId} value={item.departmentId}>
                    {item.departmentName}
                  </option>
                ))}
              </select>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md mr-1 ml-1"
                onClick={handleRole}
              >
                Save
              </button>
              <button
                className="bg-red-400 text-white border-none p-2.5 rounded-md mr-1 ml-1"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddRole}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <MainWrapper className="h-[69vh] !mt-2">
          {!props.fetchingRoles && roles.length === 0 ? <NodataFoundPage /> : roles.slice().sort((a, b) => a.roleType.localeCompare(b.roleType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] p-2 justify-between items-center h-8 mt-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" key={region.roleTypeId}>
              <div className="flex flex-row">
                {editingId === region.roleTypeId ? (
                  <>
                    <input
                      placeholder="Update Role"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    />
                  </>
                ) : (
                  <div style={{ width: "10rem" }}>
                    {region.roleType}
                  </div>
                )}

                {editingId === region.roleTypeId ? (
                  <select
                    className="customize-select"
                    onChange={handleDeptChange}
                  >
                    <option value="">Select Department</option>
                    {props.departments.map((item) => (
                      <option key={item.departmentId} value={item.departmentId}>
                        {item.departmentName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="w-[12rem] ml-1">{region.department}
                    {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?
                      <span className="text-xs ml-2 text-[tomato] font-bold">
                        New
                      </span> : null}
                  </div>
                )}
              </div>
              <div>
                {editingId === region.roleTypeId ? (
                  <div>
                    <button onClick={() => handleUpdateRole(region)}>Save</button>
                    <button className="ml-4" onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <>
                    {region.editInd ? (
                      <BorderColorIcon className="!text-icon text-red-600 cursor-pointer" onClick={() => editRegion(region.roleTypeId, region.roleType, region.department)} />
                    ) : null}
                  </>
                )}
                <Popconfirm
                  title="Do you want to delete?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => props.removeRole(region.roleTypeId, props.orgId)}
                >
                  <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                </Popconfirm>
              </div>
            </div>
          ))}
        </MainWrapper>
      </div>

      <div className="font-bold">
        Updated on {dayjs(props.roles && props.roles.length && props.roles[0].updationDate).format('YYYY-MM-DD')} by {props.roles && props.roles.length && props.roles[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ role, auth, departments }) => ({
  addingRoles: role.addingRoles,
  addingRolesError: role.addingRolesError,
  roles: role.roles,
  departments: departments.departments,
  updatinRoles: role.updatingRoles,
  userId: auth.userDetails.userId,
  updatingRolesError: role.updatingRolesError,
  fetchingRoles: role.fetchingRoles,
  fetchingRolesError: role.fetchingRolesError,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoles,
      getRoleCount,
      addRoles,
      updateRoles,
      getDepartments,
      searchRoleName,
      removeRole,
      ClearReducerDataOfRole
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Role);
