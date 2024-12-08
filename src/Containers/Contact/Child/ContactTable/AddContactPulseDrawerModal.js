import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import ContactPulseJumpstart from "./ContactPulseJumpstart";


class AddContactPulseDrawerModal extends Component {
  render() {
    //   console.log("data5", this.props.contactData.contactId);

    return (
      <div>
        <StyledDrawer
        title={this.props.contactData.fullName}
          width="38%"
          visible={this.props.addDrawerContactPulseModal}
          closable
          placement="right"
          destroyOnClose
        
          onClose={() => this.props.handleContactPulseDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <ContactPulseJumpstart 
            contactData={this.props.contactData}
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
)(AddContactPulseDrawerModal);
