import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Switch, Popconfirm } from "antd";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import {
  addingAssessmentAccess,
  getAssessmentAccess,
} from "../../../SettingsAction";
import dayjs from "dayjs";

function AssessmentTab(props) {
  useEffect(() => {
    props.getAssessmentAccess(props.orgId);
  }, []);
  const { assessmentInd } = props.assessmentAccess;
  console.log(assessmentInd);
  const [toggle, setToggle] = useState(assessmentInd);
  function handleAssessmentClick(checked) {
    console.log(assessmentInd);
    if (assessmentInd) {
      //disable url
      props.addingAssessmentAccess({
        orgId: props.orgId,
        assessmentInd: assessmentInd ? false : true,
      });
      setToggle(assessmentInd ? false : true);
    } else {
      props.addingAssessmentAccess(
        {
          orgId: props.orgId,
          assessmentInd: assessmentInd ? false : true,
        },
        props.orgId
      );
      setToggle(assessmentInd ? false : true);
    }
  }
  function handleCancel() {
    if (assessmentInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
      <div>
    
      </div>

      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto  w-[52%]">
        <p>Enable Assessment </p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
            onConfirm={handleAssessmentClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checked={toggle || assessmentInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
      <div>
        Updated on {dayjs(props.assessmentAccess.lastUpdatedOn).format("ll")}{" "}
        by {props.assessmentAccess.name}
      </div>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  assessmentAccess: settings.assessmentAccess,
  fetchingAssessmentAccess: settings.fetchingAssessmentAccess,
  fetchingAssessmentAccessError: settings.fetchingAssessmentAccessError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingAssessmentAccess,
      getAssessmentAccess,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentTab);
