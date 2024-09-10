import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import DealContactCard from "./DealContactCard";



class AddContactInvestDealModal extends Component {
  render() {
    return (
      <div>
        <StyledDrawer
          title={this.props.contactiData.fullName}
          width="90%"
          visible={this.props.addDrawerDealModal}
          closable
          placement="right"
          onClose={() => this.props.handleDealModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
           
             <DealContactCard
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
)(AddContactInvestDealModal);
