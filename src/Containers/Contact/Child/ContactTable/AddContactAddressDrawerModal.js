import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContactAddressData from "../ContactTable/ContactAddressData"
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AddressData from "../../../Address/AddressData";
//import MainNotes from "../../CustomNote/MainNotes";

class AddContactAddressDrawerModal extends Component {
  render() {
     

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.addDrawerContactAddressModal}
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
)(AddContactAddressDrawerModal);
