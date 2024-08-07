import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import StatusToggleID from "./StatusToggleID";

function AssessmentOverViewStatus(props) {
  const {
    assessmentByAssessmentId: { assessmentName, publishInd, assessmentId },
    toggleViewType,
    assessmentByAssessmentId,
  } = props;

  return (
    <>
      <div class="flex justify-between">
        <ViewEditCard>
        {({ viewType }, toggleViewType) =>
            viewType === "view" ? (  
                    
               
                <StatusToggleID               
                  assessmentByAssessmentId={assessmentByAssessmentId}
                  assessmentId={props.assessmentId}
                  publishInd={props.publishInd}
                />
             
       
          ) : null
        }
        </ViewEditCard>
      </div>
    </>
  );
}
const mapStateToProps = ({  }) => ({
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssessmentOverViewStatus);
