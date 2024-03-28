import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Timeline } from "antd";
 import {getNotesListTask } from "../TaskAction";
 import NoteTaskFile from "./NoteTaskFile";
import { BundleLoader } from "../../../Components/Placeholder";
const SingleNoteTaskForm = lazy(() => import("./SingleNoteTaskForm"));
class NotesTaskForm extends Component {
  componentDidMount() {
    this.props.getNotesListTask(this.props.currentNameId.taskId);
  }

  render() {
    const { fetchingNotesList, notesList } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteTaskFile
            type={"task"}
            taskId={this.props.currentNameId.taskId}
            callback={() =>
              this.props.getNotesListTask(this.props.currentNameId.taskId)
            }
          />
        </div>
      
        <br />

        <div class="border-spacing-2 rounded-md shadow-2xl mb-1 mt-9">
          <div class="h-[200] overflow-auto p-4">
            {fetchingNotesList ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesList &&
                    notesList.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleNoteTaskForm {...item} userId={this.props.userId} />
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
   notesList: task.notesList,
   fetchingNotesList: task.fetchingNotesList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        
        getNotesListTask
        
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesTaskForm);