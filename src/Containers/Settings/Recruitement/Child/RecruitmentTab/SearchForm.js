import React ,{useEffect,useState}from 'react';
import { Switch, Popconfirm } from "antd";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { MainWrapper } from "../../../../../Components/UI/Layout";
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
    <div class=" mt-3" />
    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[100%] ">
      <div
        style={{
          width: "44%",

          marginTop: "0.625em",
          marginLeft: "1em",
        }}
      >
        <div>
          <div class=" text-xs font-bold font-poppins"
            style={{
              flexBasis: "13%",
              marginTop: "0.625em",
              fontSize: "1em",
              fontStyle: "italic",
            }}
          >
            Employee
          </div>
        </div>
        <div class=" mt-3" />
        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  ">
              <div><div class=" text-xs font-bold font-poppins text-black">Access talent of all users</div></div>
               
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
                </div>
                <div class=" mt-3" />
                <div class=" mt-3" style={{ marginTop: "1.25em" }} />
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto">
              <div><div class=" text-xs font-bold font-poppins text-black">Talent visible to user on search</div></div>
                
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
                 </div>
              
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
          <div class=" text-xs font-bold font-poppins"
            style={{
              flexBasis: "13%",
              marginTop: "0.625em",
              fontSize: "1em",
              fontStyle: "italic",
            }}
          >
            Contractor
          </div>
        </div>
        <div class=" mt-3" />
        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  ">
            <div><div class=" text-xs font-bold font-poppins text-black">Access talent of all users</div></div>
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
              </div>
              <div class=" mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  ">
              <div>
                <div class=" text-xs font-bold font-poppins text-black">Talent visible to user on search</div></div>
                
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
                </div>  
                <div class=" mt-3" />
               
      </div>
    </div>
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
