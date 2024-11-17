import React, { lazy, Suspense } from "react";
import { useState } from "react";

import CandidateDateForm from "../Recruitment/CandidateDateForm"
import { connect } from "react-redux";
import { BundleLoader } from "../../../../../../Components/Placeholder";

import { StyledDrawer } from "../../../../../../Components/UI/Antd";
// const RequirementForm = lazy(() => import("./RequirementForm"));

const AddCandidateDateModal = (props) => {
   
  const [visible, setVisible] = useState(true)
  console.log("profile1",props.profileId)
  console.log("lap",props.candidateName)
  // setTimeout(() => {
  //   return (
  //     setVisible(true)
  //   )
  // }, 3000)
  return (
 
    <>
      
      <StyledDrawer
        title={props.candidateName}
       // title="Date"
        width="25%"
        visible={props.addCandidateDateModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleCandidateDateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          < CandidateDateForm 
          customerId={props.customerId}
            candidateId={props.candidateId}
            recruitmentId={props.recruitmentId}
           // candidate={this.props.candidate}
           profileId={props.profileId}
          />
        


        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, team, candidate,opportunity }) => ({
  topicsByCandidateId: candidate.topicsByCandidateId,
  opportunityId: opportunity.opportunity.opportunityId,
  candidate: candidate.candidate,
  fullName:auth.userDetails.fullName,
  candidate: candidate.candidate,
  user: auth.userDetails,
  addDrawerRecruiterModal:candidate.addDrawerRecruiterModal,
  candidateRequirement:opportunity.candidateRequirement,
  addCandidateDateModal:opportunity.addCandidateDateModal
  // recruitmentId:opportunity.recruitByOpportunityId.recruitmentId
});
export default connect (mapStateToProps)(AddCandidateDateModal);
