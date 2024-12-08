import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddressData from "../../../Address/AddressData";
import { StyledDrawer } from "../../../../Components/UI/Antd";





class AddCustomerAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addAddressCustomerModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleAddressCutomerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>      
          <AddressData
          uniqueId={this.props.item.customerId}
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
)(AddCustomerAdressModal);
