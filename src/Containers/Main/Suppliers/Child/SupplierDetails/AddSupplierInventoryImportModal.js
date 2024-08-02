import React, { Component,Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SupplierInventoryImportForm from "../SupplierDetails/SupplierInventoryImportForm"
import styled from 'styled-components'
//import LeadsImportForm from "../Leads/Child/LeadsImportForm"
import { StyledDrawer } from "../../../../../Components/UI/Antd";

class AddSupplierInventoryImportModal extends Component {
  render() {
  
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"60%"}
          visible={this.props.addSupplierInventoryImportModal}
      
        onClose={() => this.props.handleSupplierInventoryImportModal(false)}
         
        >
          <Suspense fallback={<BundleLoader />}>
      
        <SupplierInventoryImportForm/>
                 
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplierInventoryImportModal);
