import React, { } from "react";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";

function AssessmentOverView (props) {
 
    const {
      assessmentByAssessmentId: { assessmentName },
      toggleViewType,
      assessmentByAssessmentId,
    } = props;

  return(
      <>
        <div class="flex justify-between">
          <div class="flex start-0 flex-nowrap w-[70%]">
            <div class="w-[15%]">
              <MultiAvatar
                primaryTitle={assessmentByAssessmentId.assessmentName}
                imageId={assessmentByAssessmentId.imageId}
                imageURL={assessmentByAssessmentId.imageURL}
              />
            </div>
            <div class="flex-col w-[70%]">
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${assessmentName || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    ); 
}
export default AssessmentOverView;
