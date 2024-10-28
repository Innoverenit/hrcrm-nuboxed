import React, { Component, Suspense ,lazy} from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../Components/UI/Antd";
constMainNotes=lazy(()=> import("../CustomNote/MainNotes"));

class AddDataRoomNotesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.rowdata.name}
     width="38%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addDrawerDataroomNotesModal}
          onClose={() => this.props.handleDataroomNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
             <MainNotes
             type="room"
             uniqueId={this.props.rowdata.roomId}
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
)(AddDataRoomNotesDrawerModal);
