import React from 'react';


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import StatusToggleID from './AssessmentCards/StatusToggleID';

function AssessmentDetailsActionLeft(props) {
  const {
    assessmentByAssessmentId,
  } = props;
  return (
   <>
    
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between" }}>
          <div style={{margin:"auto"}}>
        <KeyboardReturnIcon
          class="mr-[0.3rem]" 
            iconType="rollback"
           tooltipTitle="Back"
           
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

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentDetailsActionLeft)

