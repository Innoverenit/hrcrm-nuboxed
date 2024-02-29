import { Checkbox } from 'antd';
import React ,{useEffect,useState}from 'react';
import { Formik, Form, Field } from "formik";
import { Icon, Switch, Button, Popconfirm } from "antd";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import {StyledLabel,Spacer} from "../../../../../Components/UI/Elements";
import {addingPermissionAccess,getPermissionAccess} from "../../../SettingsAction";
function SearchForm(props) {
  useEffect(() => {
    props.getPermissionAccess(props.orgId);
   
  }, []);

  const { candiEmpShareInd } = props.permissionAccess;
  console.log(candiEmpShareInd);
  const [toggle, setToggle] = useState(candiEmpShareInd)
  
  function handleCandidateClick(checked) {
    console.log(candiEmpShareInd);
    if (candiEmpShareInd) {
      //disable url
      props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiEmpShareInd:candiEmpShareInd? false : true,
              }, );
      setToggle(candiEmpShareInd ? false : true);
    } else {

      props.addingPermissionAccess({
         ...props.permissionAccess,
       orgId: props.orgId,
       candiEmpShareInd:candiEmpShareInd? false : true,
         }, props.orgId);
      setToggle(candiEmpShareInd ? false : true);
       }

  }
  function handleCancel() {
    if (candiEmpShareInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { candiEmpSrchInd } = props.permissionAccess;
  console.log(candiEmpSrchInd);
 const [shareInd, setShareInd] = useState(candiEmpSrchInd)
 
 function handleShareClick(checked) {
    console.log(candiEmpSrchInd);
   if (candiEmpSrchInd) {
     //disable url
     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiEmpSrchInd:candiEmpSrchInd? false : true,
      }, );
      setShareInd( candiEmpSrchInd ? false : true);
   } else {

     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiEmpSrchInd:candiEmpSrchInd? false : true,
     }, props.orgId);
     setShareInd(candiEmpSrchInd ? false : true);
   }

 }
 function handleCancel() {
   if (candiEmpSrchInd) {
    setShareInd(true);
   } else {
    setShareInd(false);
   }
 }

  const { candiContShareInd } = props.permissionAccess;
  console.log(candiContShareInd);
 const [externalInd, setExternalInd] = useState(candiContShareInd)
 
 function handleExternalClick(checked) {
    console.log(candiContShareInd);
   if (candiContShareInd) {
     //disable url
     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiContShareInd:candiContShareInd? false : true,
      }, );
      setExternalInd( candiContShareInd ? false : true);
   } else {

     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiContShareInd:candiContShareInd? false : true,
     }, props.orgId);
     setExternalInd(candiContShareInd ? false : true);
   }

 }
 function handleCancel() {
   if (candiContShareInd) {
    setExternalInd(true);
   } else {
    setExternalInd(false);
   }
 }

 
  const { candiContSrchInd } = props.permissionAccess;
  console.log(candiContSrchInd);
 const [searchInd, setSearchInd] = useState(candiContSrchInd)
 
 function handleSearchClick(checked) {
    console.log(candiContSrchInd);
   if (candiContSrchInd) {
     //disable url
     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiContSrchInd:candiContSrchInd? false : true,
      }, );
      setSearchInd( candiContSrchInd ? false : true);
   } else {

     props.addingPermissionAccess({
        ...props.permissionAccess,
       orgId: props.orgId,
       candiContSrchInd:candiContSrchInd? false : true,
     }, props.orgId);
     setSearchInd(candiContSrchInd ? false : true);
   }

 }
 function handleCancel() {
   if (candiContSrchInd) {
    setSearchInd(true);
   } else {
    setSearchInd(false);
   }
 }


   return (
    

    <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
    <Spacer />
    <FlexContainer justifyContent="space-between" style={{ width: "100%" }}>
      <div
        style={{
          width: "44%",

          marginTop: "0.625em",
          marginLeft: "1em",
        }}
      >
        <div>
          <StyledLabel
            style={{
              flexBasis: "13%",
              marginTop: "0.625em",
              fontSize: "1em",
              fontStyle: "italic",
            }}
          >
            Employee
          </StyledLabel>
        </div>
        <Spacer />
        <FlexContainer justifyContent="space-between">
              <div><StyledLabel>Access talent of all users</StyledLabel></div>
               
              <div>
              <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleCandidateClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||candiEmpShareInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                    </div>
                </FlexContainer>
                <Spacer />
                <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="space-between">
              <div><StyledLabel>Talent visible to user on search</StyledLabel></div>
                
              <div>
              <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleShareClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={shareInd||candiEmpSrchInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                    </div>
                 </FlexContainer>
        
     

       
       
      
      </div>

      <div
        style={{
          height: "100%",
          width: "44%",
          marginTop: "0.625em",
          marginRight: "0.75em",
        }}
      >
        <div>
          <StyledLabel
            style={{
              flexBasis: "13%",
              marginTop: "0.625em",
              fontSize: "1em",
              fontStyle: "italic",
            }}
          >
            Contractor
          </StyledLabel>
        </div>
        <Spacer />
        <FlexContainer justifyContent="space-between">
            <div><StyledLabel>Access talent of all users</StyledLabel></div>
                   <div>
                   <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleExternalClick}
             onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={externalInd||candiContShareInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
                    </div>
              </FlexContainer>
              <Spacer />
              <FlexContainer justifyContent="space-between">
              <div>
                <StyledLabel>Talent visible to user on search</StyledLabel></div>
                
              <div>

              <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleSearchClick}
             onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={searchInd||candiContSrchInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
 
                    </div>
                </FlexContainer>  
                <Spacer />
               
      </div>
    </FlexContainer>
    <div>Updated on {dayjs(props.permissionAccess.lastUpdatedOn).format("ll")} by {props.permissionAccess.name}</div> 
 
  </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  permissionAccess:settings.permissionAccess,
    orgId: auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
  fetchingPermissionAccess:settings.fetchingPermissionAccess,
  fetchingPermissionAccessError:settings.fetchingPermissionAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPermissionAccess,
      addingPermissionAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
