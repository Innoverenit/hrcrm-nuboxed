import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import ErpAddressData from "../../Address/ErpAddressData";






class AddShipperAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addShipperAddressModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleShipperAddress(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
          
          <ErpAddressData
          uniqueId={this.props.item.shipperId}
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
)(AddShipperAdressModal);
