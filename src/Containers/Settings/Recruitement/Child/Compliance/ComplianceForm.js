import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Switch,  Popconfirm } from "antd";
import {  MainWrapper } from "../../../../../Components/UI/Layout";
import { addingComplianceGdpr,getComplianceGdpr } from "../../../SettingsAction";
import dayjs from "dayjs";

function ComplianceForm(props) {
  useEffect(() => {
    props.getComplianceGdpr(props.orgId);
    }, []);
   const { gdprApplicableInd } = props.gdprCompliance;
   console.log(gdprApplicableInd);
  const [toggle, setToggle] = useState(gdprApplicableInd)
  function handleCandidateClick(checked) {
     console.log(gdprApplicableInd);
    if (gdprApplicableInd) {
      //disable url
       props.addingComplianceGdpr({
        orgId: props.orgId,
        gdprApplicableInd:gdprApplicableInd ? false : true,
    
    },);
    setToggle(gdprApplicableInd ? false : true);
   } else {

      props.addingComplianceGdpr({
        orgId: props.orgId,
        gdprApplicableInd:gdprApplicableInd? false : true,
       }, props.orgId);
      setToggle(gdprApplicableInd ? false : true);
     
    }

  }
  function handleCancel() {
    if (gdprApplicableInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
}

  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
       <div>
     
      </div>
      
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  w-[52%]">
        <p>GDPR Applicable</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleCandidateClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
               checked={toggle||gdprApplicableInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
      <div>Updated on {dayjs(props.gdprCompliance.lastUpdatedOn).format("ll")} by {props.gdprCompliance.name}</div>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  gdprCompliance:settings.gdprCompliance,
  fetchingComplianceGdpr:settings.fetchingComplianceGdpr,
  fetchingComplianceGdprError:settings.fetchingComplianceGdprError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     addingComplianceGdpr,
     getComplianceGdpr,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplianceForm);

