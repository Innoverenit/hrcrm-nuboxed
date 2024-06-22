import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Timeline } from "antd";
import {getNotesListByCallId } from "../CallAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const SingleNote = lazy(() => import("./SingleNote"));
const NoteFile = lazy(() => import("./NoteFile"));
class NotesForm extends Component {
  componentDidMount() {
     this.props.getNotesListByCallId(this.props.currentNameId.callId);
  }

  render() {
    const { fetchingNotesListByCallId, notesListByCallId } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        <div className=" bg-[#dcdcdc] h-[14.375em]">
          <NoteFile
            type={"task"}
            callId={this.props.currentNameId.callId}
            callback={() =>
               this.props.getNotesListByCallId(this.props.currentNameId.callId)
            }
          />
        </div>
      
        <br />

        <div class="border-spacing-2 rounded-md shadow mb-1 mt-9">
          <div class="h-[200] overflow-auto p-4">
            {fetchingNotesListByCallId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByCallId &&
                    notesListByCallId.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleNote {...item} userId={this.props.userId} />
                      </Timeline.Item>
                    ))}
                </Timeline>
              )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth, task,call }) => ({
   userId: auth.userDetails.userId,
   notesListByCallId: call.notesListByCallId,
   fetchingNotesListByCallId: call.fetchingNotesListByCallId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getNotesListByCallId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);