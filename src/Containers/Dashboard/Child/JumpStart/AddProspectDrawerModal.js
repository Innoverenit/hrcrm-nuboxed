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
          width={"60%"}
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