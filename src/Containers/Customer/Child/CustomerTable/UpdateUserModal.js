import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UpdateProspectUser from "../CustomerTable/UpdateProspectUser"
////import AddressData from "../../../Address/AddressData";
import { StyledDrawer } from "../../../../Components/UI/Antd";





class UpdateUserModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title=
          // "Reassigned"
          {`Reassigned : ${this.props.rowdata.name}`}
          width="35%"
          visible={this.props.updateUserModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleUpdateUserModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>      
      <UpdateProspectUser
      currentCustomerId={this.props.currentCustomerId}
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
)(UpdateUserModal);
