import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import AccountImportForm from "../Account/AccountImportForm"
//import LeadsImportForm from "../Leads/Child/LeadsImportForm"
import { StyledDrawer } from "../../../Components/UI/Antd";




class AddAccountImportModal extends Component {
  render() {
  
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"60%"}
          visible={this.props.addAccountImportModal}
      
        onClose={() => this.props.handleAccountImportModal(false)}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
        <AccountImportForm
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>

         
          
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountImportModal);
