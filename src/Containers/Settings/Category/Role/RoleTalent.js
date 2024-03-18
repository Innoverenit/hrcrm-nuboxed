import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import dayjs from "dayjs";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
 import { BundleLoader } from "../../../../Components/Placeholder";
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
const SingleRoleTalent = lazy(() =>
  import("./SingleRoleTalent")
);
const { Option } = Select;

class RoleTalent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedRoles: [],
      isTextInputOpen: false,
      addingDepartment: false,
      roleType: "",
      currentData: "",
      singleRole: "",
      userId:"",
      orgId:"",
      departmentId:"",
      departmentName:"",
      editInd:true,
    };
  }
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getTalentRoles(this.props.orgId);
      this.props.ClearReducerDataOfRoleTalent();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchRoleTalentName(this.state.currentData);
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

    handleDepartment = (value) =>
    this.setState({ departmentId: value });  

    handleAddTalentRole = () => {
    const { addTalentRoles, roles,} = this.props;
    const { roleType,cb, addingTalentRoles, isTextInputOpen,editInd} = this.state;
    let role = { roleType,userId: this.props.userId, organizationId: this.props.organizationId,editInd };

    let exist =
    roles &&
    roles.some((element) => element.roleType == roleType);

    // if (exist) {
    //   message.error(
    //     "Can't create as same Role exists!"
    //   );
    // } else {
        addTalentRoles(role, () => console.log("add role callback"));
    // }

    this.setState({
      roleType: "",
      singleRole: "",
      departmentId:"",
      departmentName: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteDepartment = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleDeleteTalentRole = (roleTypeExternalId = { roleTypeExternalId }) => {
    this.props.removeTalentRole(roleTypeExternalId);
    this.setState({ roleType: "", singleRole: "" });
  };
  handleUpdateTalentRole = (roleType ,roleTypeExternalId, editInd,cb) => {
    this.props.updateTalentRoles( roleType,roleTypeExternalId,editInd, cb);
    this.setState({ roleType: "", singleRole: "",editInd:true});
  };

  componentDidMount() {
    this.props.getTalentRoles(this.props.orgId); 
    // this.props.getDepartments();
    this.props.getExternalRoleCount(this.props.orgId);
  }
  render() {
    const {
        fetchingTalentRoles,
        fetchingTalentRolesError,
        talentRoles,
      addingTalentRoles,
      updatingRoles,
    } = this.props;
    const {
      isTextInputOpen,
      roleType,
      orgId,
      userId,
      singleRole,
      linkedRoles
      // linkedRole,
    } = this.state;
    if (fetchingTalentRoles) return <BundleLoader/>;
    if (fetchingTalentRolesError) return <p>Error ...</p>;
    return (
      <>
        <div class =" flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
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
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
              >
             
                <TextInput
                  placeholder="Add Role"
                   name="roleType"
                  value={roleType}
                   onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
              
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!roleType}
                   loading={addingTalentRoles}
                  onClick={this.handleAddTalentRole}
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
                  loading={addingTalentRoles}
                    onClick={this.toggleInput}
                  >
                    Add Type
                  </Button>
                </div>
              </>
            )}
             </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
             {talentRoles.length ? (
  talentRoles
    .slice() 
    .sort((a, b) => a.roleType.localeCompare(b.roleType)) 
    .map((talentRole, i) => (
                    <SingleRoleTalent
                      key={i}
                       value={singleRole}
                      name="singleRole"
                       talentRole={talentRole}
                       linkedRoles={linkedRoles}
                       handleDeleteTalentRole={this.handleDeleteTalentRole}
                       updatinRoles={updatingRoles}
                       handleChange={this.handleChange}
                       handleUpdateTalentRole={this.handleUpdateTalentRole}
                      
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper> 
            </div>
         
          </MainWrapper>
          <div class=" font-bold">Updated on {dayjs(this.props.talentRoles && this.props.talentRoles.length && this.props.talentRoles[0].updationDate).format('YYYY-MM-DD')} by {this.props.talentRoles && this.props.talentRoles.length && this.props.talentRoles[0].name}</div>
   
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ role ,auth,departments}) => ({
    addingTalentRoles:role.addingTalentRoles,
    addingTalentRolesError: role.addingTalentRolesError,
    talentRoles: role.talentRoles,
//   departments: departments.departments,
//    updatinRoles: role.updatingRoles,
//    userId: auth.userDetails.userId,
//      updatingRolesError: role.updatingRolesError,
fetchingTalentRoles: role.fetchingTalentRoles,
    fetchingRolesError:role.fetchingRolesError,
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
