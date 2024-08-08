import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";




class AddProspectQuotationLifeModal extends Component {
  render() {
   
    return (
      <div>
 <StyledDrawer
          title="Quotation Life"
          width={"60%"}
          visible={this.props.prospectQuotationLifeModal}
      
        onClose={() => this.props.handleQuotationLife(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
         Hello
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProspectQuotationLifeModal);
