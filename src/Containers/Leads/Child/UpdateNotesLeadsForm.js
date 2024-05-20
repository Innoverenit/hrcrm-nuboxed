import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Timeline } from "antd";
import { getNotesListByLeadsId } from "../LeadsAction";
import { BundleLoader } from "../../../Components/Placeholder";
import SingleNote from "./SingleNote";
import UpdateNoteFile from "./UpdateNoteFile";
import UpdateSingleNote from "./UpdateSingleNote";

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

//   useEffect(() => {
//     setLeadsId(props.rowdata.leadsId);
//   }, [props.rowdata.leadsId]);

  return (
    <>
      <div style={{ backgroundColor: "#dcdcdc", height: "14.375em" }}>
        <UpdateNoteFile
          type={"lead"}
          notesId={props.notesId}
          notes={props.notes}
        //   leadsId={props.rowdata.leadsId}
        //   rowdata={props.rowdata}
        //   callback={() => props.getNotesListByLeadsId(props.rowdata.leadsId)}
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
