import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { getNotesListByLeadsId } from "../LeadsAction";
import NoteFile from "./NoteFile";
import { BundleLoader } from "../../../Components/Placeholder";
import SingleNote from "./SingleNote";

const NotesForm = (props) => {
  const { fetchingNotesListByLeadsId, notesListByLeadsId } = props;
  const [leadsId, setLeadsId] = useState(null);

  useEffect(() => {
    if (leadsId) {
      props.getNotesListByLeadsId(leadsId);
    }
  }, [leadsId]);

  useEffect(() => {
    setLeadsId(props.rowdata.leadsId);
  }, [props.rowdata.leadsId]);

  return (
    <>
      <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
        <NoteFile
          type={"lead"}
          leadsId={props.rowdata.leadsId}
          callback={() => props.getNotesListByLeadsId(props.rowdata.leadsId)}
        />
      </div>

      <br />

      <div className="border-spacing-2 rounded-md shadow-2xl mb-1 mt-9">
        <div style={{ height: "41vh", overflow: "auto", padding: "1rem" }}>
          {fetchingNotesListByLeadsId ? (
            <BundleLoader />
          ) : (
            <Timeline>
              {notesListByLeadsId &&
                notesListByLeadsId.map((item, index) => (
                  <Timeline.Item key={index} style={{ paddingBottom: "0.625em" }}>
                    <SingleNote {...item} userId={props.userId} />
                  </Timeline.Item>
                ))}
            </Timeline>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, task, leads, call }) => ({
  userId: auth.userDetails.userId,
  notesListByLeadsId: leads.notesListByLeadsId,
  fetchingNotesListByLeadsId: leads.fetchingNotesListByLeadsId,
  leadsId: leads.lead.leadsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByLeadsId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);







// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Timeline } from "antd";
// import { getNotesListByLeadsId } from "../LeadsAction";
//  import NoteFile from "./NoteFile";
// import { BundleLoader } from "../../../Components/Placeholder";
// import SingleNote from "./SingleNote";

// class NotesForm extends Component {
//   componentDidMount() {
//      this.props.getNotesListByLeadsId(this.props.rowdata.leadsId);
//   }

//   render() {
//     const { fetchingNotesListByLeadsId,
//         notesListByLeadsId 
//       } = this.props;
// // console.log(this.props.currentNameId.taskId);
//     return (
//       <>
//         <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
//           <NoteFile
//             type={"lead"}
//             leadsId={this.props.rowdata.leadsId}
//             callback={() =>
//                this.props.getNotesListByLeadsId(this.props.rowdata.leadsId)
//             }
//           />
//         </div>
      
//         <br />

//         <div class="border-spacing-2 rounded-md shadow-2xl mb-1 mt-9">
//           <div style={{ height:"41vh", overflow: "auto", padding: "1rem" }}>
//             {fetchingNotesListByLeadsId ? (
//               <BundleLoader />
//             ) : (
//                 <Timeline>
//                   {notesListByLeadsId &&
//                     notesListByLeadsId.map((item, index) => (
//                       <Timeline.Item
//                         key={index}
//                         style={{ paddingBottom: "0.625em" }}
//                       >
//                         <SingleNote {...item} userId={this.props.userId} />
//                       </Timeline.Item>
//                     ))}
//                 </Timeline>
//               )}
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth, task,leads,call }) => ({
//     userId: auth.userDetails.userId,
//     notesListByLeadsId: leads.notesListByLeadsId,
//     fetchingNotesListByLeadsId: leads.fetchingNotesListByLeadsId,
//     leadsId: leads.lead.leadsId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getNotesListByLeadsId,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);