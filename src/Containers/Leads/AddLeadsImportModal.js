import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components'
import LeadsImportForm from "../Leads/Child/LeadsImportForm"
import { StyledDrawer } from "../../Components/UI/Antd";

class AddLeadsImportModal extends Component {
  render() {
  
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"60%"}
          visible={this.props.addLeadsImportModal}
      
        onClose={() => this.props.handleLeadsImportModal(false)}       
        >
          <Suspense fallback={<BundleLoader />}>
      
        <LeadsImportForm 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
        />         
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
