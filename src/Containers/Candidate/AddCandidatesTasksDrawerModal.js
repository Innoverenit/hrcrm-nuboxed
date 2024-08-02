import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux"
import CandidateTasksTable from "./CandidateTasksTable"
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import { StyledDrawer } from "../../Components/UI/Antd";

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
