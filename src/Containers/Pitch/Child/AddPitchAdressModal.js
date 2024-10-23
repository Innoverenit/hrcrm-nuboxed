import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddressData from "../../Address/AddressData";
import { StyledDrawer } from "../../../Components/UI/Antd";



class AddPitchAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addressPitchModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleAddresspitchModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>      
          <AddressData
          uniqueId={this.props.item.investorLeadsId}
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
)(AddPitchAdressModal);
