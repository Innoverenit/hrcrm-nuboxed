import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UpdateAccountUser from "../Account/UpdateAccountUser"
//import UpdateProspectUser from "../CustomerTable/UpdateProspectUser"
////import AddressData from "../../../Address/AddressData";
import { StyledDrawer } from "../../../Components/UI/Antd";





class UpdateAccountUserModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Address"
          width="60%"
          visible={this.props.updateAccountUserModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleUpdateAccountUserModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>      
      {/* <UpdateProspectUser
      currentCustomerId={this.props.currentCustomerId}
      /> */}
    <UpdateAccountUser
      RowData={this.props.RowData}
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
)(UpdateAccountUserModal);
