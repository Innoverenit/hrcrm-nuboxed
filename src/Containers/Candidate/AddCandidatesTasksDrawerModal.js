import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";

import CandidateTasksTable from "./CandidateTasksTable"

import { bindActionCreators } from "redux";
import CandidateDocumentView from "../Candidate/CandidateDocumentView"
import styled from 'styled-components'
import { StyledDrawer } from "../../Components/UI/Antd";
import { sortedLastIndex } from "lodash";
import { MainWrapper } from "../../Components/UI/Elements";



class AddCandidatesTasksDrawerModal extends Component {
  render() {
    // const {
    //   candidate: { fullName, middleName, lastName,candidateId },
    //   toggleViewType,
    //   candidate,
    // } = this.props;

    //   console.log("full",candidateId)
    //   console.log("full2", this.props.candidateTreeMap)
    return (
      <div>
 <StyledDrawer
          title="Task"
          width={"40vw"}
          visible={this.props.addDrawerCandidatesTasksModal}
        //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          style={{marginTop:"5rem"}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}          
        //   onCancel={() => this.props.handleCandidateEmailModal(false)}
        onClose={() => this.props.handleCandidatesTasksDrawerModal(false)}
          //style={{ top: 40 }}
        //   footer={null}
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        <CandidateTasksTable
         candidateTasksInfoDetails={this.props.candidateTasksInfoDetails}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCandidatesTasksDrawerModal);
const CardWrapper = styled.div`
border-radius: 1.2rem;
box-shadow: 0 0.5em 0.375em -0.375em rgb(46 44 44);
border: 0.0625em solid #eee;
background-color: #fff;
color: #444;
margin: 0.2rem;
padding: 0.3rem;
width: 8rem;
}
  }
`