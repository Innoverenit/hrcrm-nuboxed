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