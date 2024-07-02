import React, { Component, Suspense ,lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import MainNotes from "../../../CustomNote/MainNotes";
const LinkedNotes =lazy(()=> import("./CustomerTab/Notes/LinkedNotes"));




class AddCustomerNotesDrawerModal extends Component {
  render() {
    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.rowdata.name}
          width="64%"
          visible={this.props.addDrawerCustomerNotesModal}
          destroyOnClose
          closable
          onClose={() => this.props.handleCustomerNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            {/* <LinkedNotes 
            rowdata={this.props.rowdata}
            /> */}
            <MainNotes
             type="customer"
             uniqueId={this.props.rowdata.customerId}
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
)(AddCustomerNotesDrawerModal);
