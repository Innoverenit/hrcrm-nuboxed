import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import CustrContJumpstartCardList from "./CustrContJumpstartCardList";
// import NotesForm from "./NotesForm";

class AddCustomerContactJumpstartModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Sales"
           title={this.props.customer.name}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addCustomerContactJumpstartModal}
          onClose={() => this.props.handleCustomerContactJumpstartModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <CustrContJumpstartCardList 
          customer={this.props.customer} 
           
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
)(AddCustomerContactJumpstartModal);
