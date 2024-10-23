import React from 'react';
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RollbackOutlined } from "@ant-design/icons";
import StatusToggleID from './AssessmentCards/StatusToggleID';

function AssessmentDetailsActionLeft(props) {
  const {
    assessmentByAssessmentId,
  } = props;
  return (
   <>
    
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between" }}>
          <div style={{margin:"auto"}}>
        <RollbackOutlined
          class="mr-[0.3rem]" 
            iconType="rollback"
           tooltipTitle={
            <FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />
          }
        onClick={() => props.history.goBack()}
        />
        </div>
        <div class=" m-auto">
        <h7>{`${props.assessmentByAssessmentId.assessmentName}`}</h7>
        </div>
        <div class="ml-5">
        <StatusToggleID
        assessmentByAssessmentId={assessmentByAssessmentId}
        assessmentId={props.assessmentId}
        publishInd={props.publishInd}
        />
        </div>
        </div>
     
   </>
  )
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssessmentDetailsActionLeft)
);
