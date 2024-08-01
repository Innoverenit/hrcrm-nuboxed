import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getNotesListByLeadsId } from "../LeadsAction";
import UpdateNoteFile from "./UpdateNoteFile";


const UpdateNotesLeadsForm = (props) => {
  const { fetchingNotesListByLeadsId, notesListByLeadsId } = props;
  const [leadsId, setLeadsId] = useState(null);
  const [rowdata, setrowData] = useState({});
  const handleRowData = (item) => {
    setrowData(item);
  };

  useEffect(() => {
    if (leadsId) {
      props.getNotesListByLeadsId(leadsId);
    }
  }, [leadsId]);


  return (
    <>
      <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
        <UpdateNoteFile
          type={"lead"}
          notesId={props.notesId}
          notes={props.notes}
      
        />
      </div>

      <br />

    
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNotesLeadsForm);
