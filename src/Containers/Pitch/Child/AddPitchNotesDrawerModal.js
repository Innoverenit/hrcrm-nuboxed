import React, { lazy, Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
const NotesForm =lazy(()=>import("./NotesForm"));

class AddPitchNotesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.item.firstName}
          width="60%"
          visible={this.props.addDrawerPitchNotesModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handlePitchNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <NotesForm item={this.props.item} 
            investorLeadsId={this.props.item.investorLeadsId} 
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
)(AddPitchNotesDrawerModal);
