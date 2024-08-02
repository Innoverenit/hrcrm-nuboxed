import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import { StyledDrawer } from "../../Components/UI/Antd";
const CandidateDocumentView = lazy(() =>
  import("../Candidate/CandidateDocumentView")
);
const CandidateTreeMap = lazy(() =>
  import("../Candidate/CandidateTreeMap")
);



class AddCandidateDrawerModal extends Component {
  render() {
    const {
      candidate: { fullName, middleName, lastName,candidateId },
      toggleViewType,
      candidate,
    } = this.props;

      console.log("full",candidateId)
      console.log("full2", this.props.candidateTreeMap)
    return (
      <div>
 <StyledDrawer
          title={fullName}
          width={"60%"}
          visible={this.props.addDrawerCandidateModal}
      
        onClose={() => this.props.handleCandidateDrawerModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
          <CandidateDocumentView
           candidateId={candidateId}
           documentsByCandidateId={this.props.documentsByCandidateId}
          //candidate={candidate}
          />

          <CandidateTreeMap
          candidateTreeMap={this.props.candidateTreeMap}
          />
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCandidateDrawerModal);

