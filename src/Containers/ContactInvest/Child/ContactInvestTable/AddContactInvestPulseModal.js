import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import ContactInvestPulseJumpstart from "./ContactInvestPulseJumpstart";


class AddContactInvestPulseModal extends Component {
  render() {
    //   console.log("data5", this.props.contactData.contactId);

    return (
      <div>
        <StyledDrawer
        title={this.props.contactiData.fullName}
          width="64%"
          visible={this.props.addDrawerContactInvestPulseModal}
          closable
          placement="right"
          destroyOnClose
        
          onClose={() => this.props.handleContactInvestPulseDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <ContactInvestPulseJumpstart 
            contactiData={this.props.contactiData}
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
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactInvestPulseModal);
