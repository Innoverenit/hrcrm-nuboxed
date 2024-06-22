import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Timeline } from "antd";
 import {getNotesListByTaskId } from "../TaskAction";
 import NoteFile from "./NoteFile";
import { BundleLoader } from "../../../Components/Placeholder";
const SingleNote = lazy(() => import("./SingleNote"));
class NotesForm extends Component {
  componentDidMount() {
    this.props.getNotesListByTaskId(this.props.currentNameId.taskId);
  }

  render() {
    const { fetchingNotesListByTaskId, notesListByTaskId } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteFile
            type={"task"}
            taskId={this.props.currentNameId.taskId}
            callback={() =>
              this.props.getNotesListByTaskId(this.props.currentNameId.taskId)
            }
          />
        </div>
      
        <br />

        <div class="border-spacing-2 rounded-md shadow mb-1 mt-9">
          <div class="h-[200] overflow-auto p-4">
            {fetchingNotesListByTaskId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByTaskId &&
                    notesListByTaskId.map((item, index) => (
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

const mapStateToProps = ({ auth, task }) => ({
   userId: auth.userDetails.userId,
   notesListByTaskId: task.notesListByTaskId,
   fetchingNotesListByTaskId: task.fetchingNotesListByTaskId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getNotesListByTaskId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);