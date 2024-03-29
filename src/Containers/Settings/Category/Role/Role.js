import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Tooltip, Input } from "antd";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getRoles,
  getRoleCount,
  addRoles,
  updateRoles,
  searchRoleName,removeRole,ClearReducerDataOfRole
} from "./RoleAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import * as Yup from "yup";

import { getDepartments } from "../../Department/DepartmentAction";
import { Select } from "../../../../Components/UI/Elements";
const SingleRole = lazy(() =>
  import("./SingleRole")
);
const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  departmentName: Yup.string().required("Input needed!"),
});


class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedRoles: [],
      isTextInputOpen: false,
      addingDepartment: false,
      roleType: "",
      singleRole: "",
      userId: "",
      orgId: "",
      departmentId: "", // Add departmentId to state
      departmentName: "",
      editInd: true,
      currentData: "",
      error: "", // Add error field for validation error message
    };
  }

    handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getRoles(this.props.organizationId);
      this.props.ClearReducerDataOfRole();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchRoleName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleDepartment = (value) => this.setState({ departmentId: value });

  handleAddRole = () => {
 
    const { addRoles, roles } = this.props;
    const {
      roleType,
      cb,
      addingRoles,
      isTextInputOpen,
      departmentId, // Add departmentId to state
      editInd,
    } = this.state;
  
  
    if (!departmentId) {
      this.setState({ error: "Please select a department" });
      return;
    }
  
    let role = {
      roleType,
      userId: this.props.userId,
      organizationId: this.props.organizationId,
      departmentId,
      editInd,
    };
  
    // let exist = roles && roles.some((element) => element.roleType == roleType);
  
    // if (exist) {
    //   message.error("Can't create as same Role exists!");
    // } else {
      addRoles(role, () => console.log("add role callback"));
      this.setState({
        roleType: "",
        singleRole: "",
        departmentId: "",
        departmentName: "",
        isTextInputOpen: false,
        editInd: true,
        error: "", // Clear the error message when successfully adding a role
      });
    // }
  };
  

  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getRoles(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value });
  };
  handleDeleteRole = (roleTypeId={roleTypeId}) => {
    this.props.removeRole(roleTypeId);
    this.setState({ roleType: "", singleRole: "" });
  };
  handleUpdateRole = (
    roleType,
    roleTypeId,
    departmentId,
    departmentName,
    editInd,
    cb
  ) => {
    this.props.updateRoles(
      roleType,
      roleTypeId,
      departmentId,
      departmentName,
      editInd,
      cb
    );
    this.setState({
      roleType: "",
      singleRole: "",
      departmentId: "",
      departmentName: "",
      editInd: true,
    });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    this.props.getRoles(this.props.organizationId);
    this.props.getDepartments();
    this.props.getRoleCount(this.props.orgId)
    // const { getRoles ,getDepartments} = this.props;
    // getDepartments(getDepartments);
    // console.log();
    // getRoles();
  }
  render() {
    console.log("departmentId",this.state.departmentId)
    const {
      fetchingRoles,
      fetchingRolesError,
      roles,
      addingRoles,
      updatingRoles,
    } = this.props;
    const {
      isTextInputOpen,
      roleType,
      orgId,
      userId,
      singleRole,
      linkedRoles,
      // linkedRole,
    } = this.state;
    if (fetchingRoles) return <BundleLoader/>;
    if (fetchingRolesError) return <p>Error ...</p>;
    return (
      <>
        <div class="flex flex-no-wrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div class=" flex flex-row justify-between">
            <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            <Tooltip placement="left" title="XL">

<a href={`${base_url}/excel/export/catagory/All/${this.props.orgId}?type=${"roleType"}`}>
<DownloadIcon 
className=" !text-base cursor-pointer text-[green]"/>
</a>

</Tooltip>
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
              >
              
                <TextInput
                  placeholder="Add Role"
                  name="roleType"
                  value={roleType}
                  onChange={this.handleChange}
                  width="30%"
                  style={{ marginRight: "0.125em" }}
                />
                
                <Select
                 isRequired
                  style={{ width: "40%" }}
                  placeholder="Select Department"
                  onChange={this.handleDepartment}
                >
                  {this.props.departments.map((item) => {
                    return (
                      <Option value={item.departmentId}>
                        {item.departmentName}{" "}
                      </Option>
                    );
                  })}
                
{this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}

                </Select>
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!roleType}
                  loading={addingRoles}
                  onClick={this.handleAddRole}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
              
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={addingRoles}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
               
              </>
            )}
                </div>
            <div class=" flex flex-col" >
         
            <MainWrapper className="!h-[69vh] !mt-2" >
              {roles.length ? (
  roles
    .slice() 
    .sort((a, b) => a.roleType.localeCompare(b.roleType)) 
    .map((role, i) => (
                    <SingleRole
                      key={i}
                      value={singleRole}
                      name="singleRole"
                      role={role}
                      linkedRoles={linkedRoles}
                      updatinRoles={updatingRoles}
                      handleChange={this.handleChange}
                      handleUpdateRole={this.handleUpdateRole}
                      departments={this.props.departments}
                      departmentId={this.state.departmentId}
                      handleDepartment={this.handleDepartment}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                      handleDeleteRole={this.handleDeleteRole}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
           
          </MainWrapper>
       
         
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.roles && this.props.roles.length && this.props.roles[0].updationDate).format('YYYY-MM-DD')} by {this.props.roles && this.props.roles.length && this.props.roles[0].name}</div>
      </>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Department);
