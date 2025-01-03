import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const   AddressData = lazy(() =>  import("../../../Address/AddressData"));

class AddContactInvestAdressModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addContactAddressModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleContactAddressDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          
          {/* <ContactAddressData
           item={this.props.item}
          /> */}
          <AddressData
          uniqueId={this.props.item.contactId}
          type={this.props.type}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
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
)(AddContactInvestAdressModal);
