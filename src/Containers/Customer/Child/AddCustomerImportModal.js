import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
