import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
class AddContactDrawerModal extends Component {
  render() {
    return (
      <div>
        <StyledDrawer
          title={this.props.item.fullName}
         className="w-[60%]"
          visible={this.props.addDrawerContactModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleContactDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}></Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth, employee, contact }) => ({
  contactById: contact.contactById,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactDrawerModal);
