// 

import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import {  Switch, Popconfirm } from "antd";
import {  MainWrapper } from "../../../../../Components/UI/Layout";
import { getThirdPartyAccess,addingThirdPartyAccess } from "../../../SettingsAction";

function ThirdPartyVendorForm(props) {
  useEffect(() => {
    props.getThirdPartyAccess(props.orgId);
  }, []);

   const { partnerContactInd } = props.thirdPartyAccess;
   console.log(partnerContactInd);
  const [toggle, setToggle] = useState(partnerContactInd)

  function handlePartnerContactClick(checked) {
     console.log(partnerContactInd);
    if (partnerContactInd) {
      //disable url
      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        partnerContactInd:partnerContactInd? false : true,
        }, );
       setToggle( partnerContactInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        partnerContactInd:partnerContactInd? false : true,
      }, props.orgId);
    setToggle(partnerContactInd ? false : true);
    }

  }
  function handleCancel() {
    if (partnerContactInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { partnerAiInd } = props.thirdPartyAccess;
  console.log(partnerAiInd);
 const [partnerInd, setPartnerInd] = useState(partnerAiInd)
 
 function handlePartnerAIClick(checked) {
    console.log(partnerAiInd);
   if (partnerAiInd) {
     //disable url
     props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
       orgId: props.orgId,
       partnerAiInd:partnerAiInd? false : true,
      }, );
     setPartnerInd( partnerAiInd ? false : true);
   } else {

     props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
       orgId: props.orgId,
       partnerAiInd:partnerAiInd? false : true,
     }, props.orgId);
     setPartnerInd(partnerAiInd ? false : true);
   }

 }
 function handleCancel() {
   if (partnerAiInd) {
    setPartnerInd(true);
   } else {
    setPartnerInd(false);
   }
 }

 const { allowPrfWithVendorInd } = props.thirdPartyAccess;
 console.log(allowPrfWithVendorInd);
const [profileInd, setProfileInd] = useState(allowPrfWithVendorInd)

function handleProfileClick(checked) {
   console.log(allowPrfWithVendorInd);
  if (allowPrfWithVendorInd) {
    //disable url
    props.addingThirdPartyAccess({
       ...props.thirdPartyAccess,
      orgId: props.orgId,
      allowPrfWithVendorInd:allowPrfWithVendorInd? false : true,
     }, );
     setProfileInd( allowPrfWithVendorInd ? false : true);
  } else {

    props.addingThirdPartyAccess({
       ...props.thirdPartyAccess,
      orgId: props.orgId,
      allowPrfWithVendorInd:allowPrfWithVendorInd? false : true,
    }, props.orgId);
    setProfileInd(allowPrfWithVendorInd ? false : true);
  }

}
function handleCancel() {
  if (allowPrfWithVendorInd) {
    setProfileInd(true);
  } else {
    setProfileInd(false);
  }
}


  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
          
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Allow Access to Vendor Portal</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handlePartnerContactClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||partnerContactInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div> 
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Enable AI Assist</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handlePartnerAIClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
               checked={partnerInd||partnerAiInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Share profile with Vendors</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleProfileClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={profileInd||allowPrfWithVendorInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
      <div>Updated on {dayjs(props.thirdPartyAccess.lastUpdatedOn).format("ll")} by {props.thirdPartyAccess.name}</div>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  thirdPartyAccess:settings.thirdPartyAccess,
   userId: auth.userDetails.userId,
  fetchingThirdPartyVendorAccess:settings.fetchingThirdPartyVendorAccess,
  fetchingThirdPartyVendorAccessError:settings.fetchingThirdPartyVendorAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getThirdPartyAccess,
      addingThirdPartyAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyVendorForm);