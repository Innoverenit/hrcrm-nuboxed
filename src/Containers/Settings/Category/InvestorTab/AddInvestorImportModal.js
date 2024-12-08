import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";
import InvestorImportForm from "./InvestorImportForm";




class AddInvestorImportModal extends Component {
  render() {
   
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"60%"}
          visible={this.props.addInvestorImportModal}
      
        onClose={() => this.props.handleInvestorImportModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
     <InvestorImportForm/>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(AddInvestorImportModal);
