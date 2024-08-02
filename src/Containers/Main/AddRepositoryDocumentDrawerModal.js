import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import UpdateRepositoryDocumentForm from "./UpdateRepositoryDocumentForm"
import { StyledDrawer } from "../../Components/UI/Antd";



class AddRepositoryDocumentDrawerModal extends Component {
  render() {
  

      
    return (
      <div>
 <StyledDrawer
          title="Update Repository"
          width={"60%"}
          destroyOnClose
          maskClosable={false}
          visible={this.props.addDrawerRepositoryDocumentModal}
      
        onClose={() => this.props.handleRepositoryDocumentDrawerModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      <UpdateRepositoryDocumentForm/>
        
        
          
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

export default connect(mapStateToProps, mapDispatchToProps)(AddRepositoryDocumentDrawerModal);
