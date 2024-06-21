import React from "react";
import styled from "styled-components";
import { Timeline, Button, Popconfirm } from 'antd';
import moment from "moment";
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { updateLeadsNoteDrawer } from "../LeadsAction";
import { DeleteOutlined } from "@ant-design/icons";
import { Spacer, SubTitle } from "../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Item from "antd/es/list/Item";
// import UpdateLeadsNote from "./UpdateLeadsNote";

const NotesWrapper = styled.div``;

const SingleNoteProcure = (props) => {
  const {
    comment,
    notes,
    noteId,
    notesId,
    creationDate,
    ownerName,
    userId,
    creatorId,
  } = props;

  return (
    <>
    <NotesWrapper>
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <SubTitle
        fontSize="0.875em"
        fontFamily="poppins"
        style={{ color: "rgb(53, 57, 61)", marginTop: "-0.75em" }}
      >
        <Spacer />
        {`${moment.utc(creationDate).fromNow()}`} {ownerName} &nbsp;&nbsp;
     
           &nbsp;&nbsp;
            <BorderColorIcon
             style={{fontSize:"1rem", cursor:"pointer"}}
            // onClick={() => {
            //   props.updateLeadsNoteDrawer(true);
            // }}
       />
  
      </SubTitle>
    </NotesWrapper>
        {/* <UpdateLeadsNote
        notes={notes}
        notesId={notesId}
        updatingLeadsNoteDrawer={props.updatingLeadsNoteDrawer}
        updateLeadsNoteDrawer={props.updateLeadsNoteDrawer
           }
           /> */}
           </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  updatingLeadsNoteDrawer:leads.updatingLeadsNoteDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      // updateLeadsNote,
      //updateLeadsNoteDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleNoteProcure);
