import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Switch, Popconfirm } from "antd";
import {  MainWrapper } from "../../../../../Components/UI/Layout";

import { addingSourcingAccess, getSourcingAccess } from "../../../../Settings/SettingsAction";


function SourcingForm(props) {
  useEffect(() => {
    props.getSourcingAccess(props.orgId);
  }, []);
  const { talentOutRichInd } = props.sourcingAccess;
  console.log(talentOutRichInd);
  const [toggle, setToggle] = useState(talentOutRichInd)
    function handleCandidateClick(checked) {
     console.log(talentOutRichInd);
    if (talentOutRichInd) {
      //disable url
      props.addingSourcingAccess({
        orgId: props.orgId,
        talentOutRichInd:talentOutRichInd? false : true,
      }, );
      setToggle(talentOutRichInd ? false : true);
    } else {

      props.addingSourcingAccess({
        orgId: props.orgId,
        talentOutRichInd: talentOutRichInd ? false : true,
      }, props.orgId);
      setToggle(talentOutRichInd ? false : true);
    }

  }
  function handleCancel() {
    if (talentOutRichInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
 
  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
       <div>
      {/* <div class=" text-xs font-bold font-poppins text-black"> 
           Click To Share                   
      </div> */}
      {/* <PermissionForm /> */}
      </div>
      
      <div class=" mt-3" />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between w-[52%] grow shrink h-auto mr-auto ">
        <p>Talent out reach</p>
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
               checked={toggle || talentOutRichInd}
              checkedChildren="Passive"
              unCheckedChildren="AI enabled"
            />
          </Popconfirm>
        </div>
        <div class=" mt-3" marginTop="30px" />
       
      </div>
          </MainWrapper>
   
    
  );

}


const mapStateToProps = ({ settings, auth }) => ({
     userId: auth.userDetails.userId,
     orgId: auth.userDetails.organizationId,
     sourcingAccess:settings.sourcingAccess,
  fetchingSourcingAccess:settings.fetchingSourcingAccess,
  fetchingSourcingAccessError:settings.fetchingSourcingAccessError,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSourcingAccess,
      addingSourcingAccess,
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourcingForm);