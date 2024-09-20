import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";

const ErpAddressData = lazy(() => import("../../Address/ErpAddressData"));
class AddAccountAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addAccountAddressModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleAccountAddress(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
          
          <ErpAddressData
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
          uniqueId={this.props.item.distributorId}
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
)(AddAccountAdressModal);
