import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Timeline } from "antd";
 //import {getNotesListTask } from "../TaskAction";
 import NoteCustomerFile from "../CustomerDetail/NoteCustomerFile";
// import { BundleLoader } from "../../../Components/Placeholder";
const SingleCustomerNotesForm = lazy(() => import("../CustomerDetail/SingleCustomerNotesForm"));
class NotesProspectForm extends Component {
//   componentDidMount() {
//     this.props.getNotesListTask(this.props.currentNameId.taskId);
//   }

  render() {
    const { fetchingNotesList, customerNoteList } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        {/* <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteCustomerFile
            type={"task"}
            //taskId={this.props.currentNameId.taskId}
            // callback={() =>
            //   this.props.getNotesListTask(this.props.currentNameId.taskId)
            // }
          />
        </div> */}
      
        <br />

        <div class="border-spacing-2 rounded-md shadow mb-1 mt-9">
          <div class="h-[200] overflow-auto p-4">
            {/* {fetchingNotesList ? (
              <BundleLoader />
            ) : ( */}
                <Timeline>
                   {customerNoteList &&
                    customerNoteList.map((item, index) => ( 
                      <Timeline.Item
                        key={index}
                        style={{ paddingBottom: "0.625em" }}
                      >
                        <SingleCustomerNotesForm 
                        {...item} 
                        // userId={this.props.userId} 
                        />
                        {/* Hello */}
                      </Timeline.Item>
                     ))} 
                </Timeline>
              {/* )} */}
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
        
        // getNotesListTask
        
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesProspectForm);