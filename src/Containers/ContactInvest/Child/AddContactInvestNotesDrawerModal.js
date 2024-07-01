import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import LinkedContactInvestNotes from "./ContactInvestDetail/ContactInvestDetailTab/ContactInvestNotes/LinkedContactInvestNotes";
import MainNotes from "../../CustomNote/MainNotes";

class AddPitchNotesDrawerModal extends Component {
  render() {
    return (
      <div>
        <StyledDrawer
          title={this.props.contactiData.fullName}
          width="60%"
          visible={this.props.addDrawerContactInvestNotesModal}
          closable
          placement="right"
          onClose={() => this.props.handleContactInvestNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            {/* <LinkedContactInvestNotes contactiData={this.props.contactiData} 
            contactId={this.props.contactiData.contactId} 
            /> */}
             <MainNotes
             type="contactInvest"
             uniqueId={this.props.contactiData.contactId}
            />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPitchNotesDrawerModal);
