import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QuotationTabData from "./QuotationTabData"
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";




class AddProspectQuotationModal extends Component {
  render() {
   
    return (
      <div>
 <StyledDrawer
          title="Quotation Year"
          width={"60%"}
          visible={this.props.prospectQuotationYearModal}
      destroyOnClose
        onClose={() => this.props.handleQuotationYear(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
        <QuotationTabData
        selectedCountry={this.props.selectedCountry}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProspectQuotationModal);
