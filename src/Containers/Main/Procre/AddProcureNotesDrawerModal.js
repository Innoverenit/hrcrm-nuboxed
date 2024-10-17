import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";



class AddProcureNotesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
         title="Notes"
         // title={this.props.particularRowData.name}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addDrawerProcureNotesModal}
          onClose={() => this.props.handleProcureNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
           {/* <MainNotes/> */}
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
)(AddProcureNotesDrawerModal);
