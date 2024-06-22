import React, { lazy,Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Timeline } from "antd";
import { getNotesListByPitchId } from "../PitchAction";
import { BundleLoader } from "../../../Components/Placeholder";
const SingleNote =lazy(()=>import("./SingleNote"));
const NoteFile =lazy(()=>import("./NoteFile"));

class NotesForm extends Component {
  componentDidMount() {
     this.props.getNotesListByPitchId(this.props.investorLeadsId);
  }

  render() {
    const { fetchingNotesListByPitchId,
        notesListByPitchId 
      } = this.props;
// console.log(this.props.currentNameId.taskId);
    return (
      <>
        <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
          <NoteFile
            type={"lead"}
            investorLeadsId={this.props.investorLeadsId}
            callback={() =>
               this.props.getNotesListByPitchId(this.props.investorLeadsId)
            }
          />
        </div>
      
        <br />

        <div class="border-spacing-2 rounded-md shadow mb-1 mt-9">
          <div style={{ height: 200, overflow: "auto", padding: "1rem" }}>
            {fetchingNotesListByPitchId ? (
              <BundleLoader />
            ) : (
                <Timeline>
                  {notesListByPitchId &&
                    notesListByPitchId.map((item, index) => (
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

const mapStateToProps = ({ auth, task,leads,call,pitch }) => ({
    userId: auth.userDetails.userId,
    notesListByPitchId: pitch.notesListByPitchId,
    fetchingNotesListByPitchId: pitch.fetchingNotesListByPitchId,
    leadsId: leads.lead.leadsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getNotesListByPitchId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);