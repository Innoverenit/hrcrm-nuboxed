import React, { Component } from "react";
 import CandidateCatagoryCard from "./RecruitmentCard/CandidateCatagoryCard";
 import RecruitmentDocumentCard from "./RecruitmentCard/RecruitmentDocumentCard"
import RecruitmentDetailsRight from "./RecruitmentDetailsRight"

class RecruitmentDetailsLeft extends Component {
  render() {
    const { candidate } = this.props;
    console.log("Detail4",this.props.candidateId)
    return (
      <div class=" block flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        {/* <RecruitmentCandidateCard candidate={candidate} /> */}
        <RecruitmentDetailsRight  
        candidate={this.props.candidate}
        candidateId={this.props.candidateId}
                      stageList={this.props.stageList}
                      profileId={this.props.profileId}
                      />
  <div style={{display:"flex"}}>  
  <div style={{width: "50%"}}>         
         <CandidateCatagoryCard candidate={candidate} />
         </div>
         <div style={{width: "50%"}}>
         <RecruitmentDocumentCard candidate={candidate} />
         </div>
         </div>
      
      </div>
    );
  }
}

export default RecruitmentDetailsLeft;
