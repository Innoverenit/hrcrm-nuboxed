

import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";

import { connect } from "react-redux";
import RecruitmentDetails from "../../../OpportunityDetail/OpportunityTab/Recruitment/Child/RecruitmentDetails"
//import { getCandidateDocument } from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";
//import CandidateDocumentView from "../Candidate/CandidateDocumentView"

import { StyledDrawer, StyledModal } from "../../../../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";



class AddRecruiterDrawerModal extends Component {
  
  // componentDidMount() {
  //   const {
  //     candidate: { candidateId },
  //     getCandidateDocument,
  //   } = this.props;
  //   getCandidateDocument(candidateId);
  // }
   
  

  

 
  render() {
    // const data=this.props.candidateByUserId.map((item)=>{
    //   return item.fullName
      
    // })
    const {
      candidate: { fullName, middleName, lastName,candidateId },
      toggleViewType,
      candidate,
    } = this.props;

      console.log("full",this.props.candidateName)
      console.log("full1",this.props.candidateId)
   
   
    return (
      <div>
 <StyledModal
          title={this.props.candidateName}
          width="47em"
          visible={this.props.subTableVisible}
        //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //   onCancel={() => this.props.handleCandidateEmailModal(false)}
        onClose={() => this.props.handleIconClick(this.props.profileId)}
          //style={{ top: 40 }}
        //   footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
        
          <RecruitmentDetails
      candidateId={this.props.candidateId}
      candidate={this.props.candidate}
      profileId={this.props.profileId}
      stageList={this.props.stageList}
    />
          
        </Suspense>
         
        </StyledModal>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  // candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddRecruiterDrawerModal);
