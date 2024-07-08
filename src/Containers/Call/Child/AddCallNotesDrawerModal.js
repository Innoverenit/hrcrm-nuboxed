import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import MainNotes from "../../CustomNote/MainNotes";


class AddCallNotesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
          title={this.props.currentNameId.callType}
          width="60%"
          visible={this.props.addDrawerCallNotesModal}
          onClose={() => this.props.handleCallNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>           
            <MainNotes
             type="call"
             uniqueId={this.props.currentNameId.callId}
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
)(AddCallNotesDrawerModal);
