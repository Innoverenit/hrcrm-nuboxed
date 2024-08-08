import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProspectTableData from "../JumpStart/ProspectTableData"
import styled from 'styled-components'
import { StyledDrawer } from "../../../../Components/UI/Antd";




class AddProspectDrawerModal extends Component {
  render() {
   
    return (
      <div>
 <StyledDrawer
          title="Prospect"
          width={"87%"}
          destroyOnClose
          visible={this.props.prospectDrawerModal}
      
        onClose={() => this.props.handleProspectDrawer(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        
       <ProspectTableData
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProspectDrawerModal);

