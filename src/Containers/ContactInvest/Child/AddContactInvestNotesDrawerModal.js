import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../Components/UI/Antd";
import LinkedContactInvestNotes from "./ContactInvestDetail/ContactInvestDetailTab/ContactInvestNotes/LinkedContactInvestNotes";

class AddPitchNotesDrawerModal extends Component {
  render() {
      console.log("data5", this.props.contactiData.contactId);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.contactiData.fullName}
          width="64%"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerContactInvestNotesModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleContactInvestNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedContactInvestNotes contactiData={this.props.contactiData} 
            contactId={this.props.contactiData.contactId} 
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
