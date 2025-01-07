import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const AddressData = lazy(() => import("../../../Address/AddressData"));
class AddInvestorAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addInvestorAddressModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleInvestorAddressDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
          <AddressData
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
          uniqueId={this.props.item.investorId}
          type={this.props.type}
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
)(AddInvestorAdressModal);
