import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ErpAddressData from "../../Address/ErpAddressData";
import { StyledDrawer } from "../../../Components/UI/Antd";





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
