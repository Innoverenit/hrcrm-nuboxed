import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import CustomerImportForm from "../Child/CustomerImportForm"
//import LeadsImportForm from "../Leads/Child/LeadsImportForm"
import { StyledDrawer } from "../../../Components/UI/Antd";




class AddLeadsImportModal extends Component {
  render() {
  
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"60%"}
          visible={this.props.addCustomerImportModal}
      
        onClose={() => this.props.handleCustomerImportModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
        {/* <LeadsImportForm

        /> */}
        <CustomerImportForm/>
         
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddLeadsImportModal);
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