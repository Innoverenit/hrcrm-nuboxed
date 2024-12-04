import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const ErpAddressData =lazy(()=>import("../../../Address/ErpAddressData"));

class AddSuppliersAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addSuppliersAddressModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleSuppliersAddress(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
          
          <ErpAddressData
          uniqueId={this.props.item.supplierId}
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
)(AddSuppliersAdressModal);
