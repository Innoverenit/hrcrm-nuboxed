import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
 import { getNotesListByProcure } from "./ProcreAction";
import { BundleLoader } from "../../../Components/Placeholder";
import SingleNoteProcure from "./SingleNoteProcure";
import NoteFileProcure from "./NoteFileProcure";


const NotesFormProcure = (props) => {
  const { fetchingNotesListByProcure, notesListByPrcure } = props;
  // const [procureId, setprocureId] = useState(null);

  useEffect(() => {
    if (props.particularRowData.procureId) {
      props.getNotesListByProcure("Procure",props.particularRowData.procureId);
    }
  }, ["Procure",props.particularRowData.procureId]);

  // useEffect(() => {
  //   setprocureId("Procure",props.particularRowData.procureId);
  // }, ["Procure",props.particularRowData.procureId]);

  return (
    <>
     

      

      <div className="border-spacing-2 rounded-md shadow ">
      <div class="h-[52vh] overflow-auto p-2">
          {fetchingNotesListByProcure ? (
            <BundleLoader />
          ) : (
            <Timeline>
              {notesListByPrcure &&
                notesListByPrcure.map((item, index) => (
                  <Timeline.Item key={index} style={{ paddingBottom: "0.625em" }}>
                    <SingleNoteProcure {...item} userId={props.userId} />
                  </Timeline.Item>
                ))}
            </Timeline>
          )}
        </div>
      </div>
      <br />
      <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
        <NoteFileProcure
          type={"lead"}
          particularRowData={props.particularRowData} 
         callback={() => props.getNotesListByProcure("Procure",props.particularRowData.procureId)}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, task, leads, procre }) => ({
  userId: auth.userDetails.userId,
  notesListByPrcure: procre.notesListByPrcure,
  fetchingNotesListByProcure: procre.fetchingNotesListByProcure,
  leadsId: leads.lead.leadsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotesListByProcure,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotesFormProcure);




