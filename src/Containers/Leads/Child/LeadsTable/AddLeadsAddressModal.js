import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AddressData from "../../../Address/AddressData";

class AddLeadsAddressDrawerModal extends Component {
  render() {
     console.log(this.props.item)

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addDrawerLeadsAddressModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleLeadsAddressDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
          {/* <ContactAddressData
           item={this.props.item}
          /> */}
          <AddressData
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
          uniqueId={this.props.item.leadsId}
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
)(AddLeadsAddressDrawerModal);
