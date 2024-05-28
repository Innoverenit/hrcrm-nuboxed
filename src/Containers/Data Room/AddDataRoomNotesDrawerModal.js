import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../Components/UI/Antd";
import NotesForm from "../Call/Child/NotesForm";


class AddDataRoomNotesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.rowdata.name}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addDrawerDataroomNotesModal}
          onClose={() => this.props.handleDataroomNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <NotesForm rowdata={this.props.rowdata} 
            //leadsId={this.props.rowdata.leadsId} 
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
