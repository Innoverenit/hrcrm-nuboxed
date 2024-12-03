

import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";

import { connect } from "react-redux";
import ReportsProductuvityData from "../ReportDetails/ReportsProductuvityData"
//import RecruitmentDetails from "../../../OpportunityDetail/OpportunityTab/Recruitment/Child/RecruitmentDetails"
//import { getCandidateDocument } from "../Candidate/CandidateAction";
import { bindActionCreators } from "redux";
//import CandidateDocumentView from "../Candidate/CandidateDocumentView"

import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";



class AddReportProductivityModal extends Component {
  
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
   
   
   
    return (
      <div>
 <StyledDrawer 
          title="Productivity"
          width="47em"
          visible={this.props.addReportsProductivityModal}
        //   maskClosable={false}
          closable
         
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //   onCancel={() => this.props.handleCandidateEmailModal(false)}
        onClose={() => this.props.addReportsProductivity(false)}
          //style={{ top: 40 }}
        //   footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
          
      <ReportsProductuvityData
      userId={this.props.userId}
        startDateData={this.props.startDateData}
      />
        </Suspense>
         
        </StyledDrawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddReportProductivityModal);
