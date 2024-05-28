import React from "react";
import styled from "styled-components";
import { Timeline, Button, Popconfirm } from 'antd';
import moment from "moment";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { removeLeadsNote,updateLeadsNote,updateLeadsNoteDrawerModal } from "../../LeadsAction";
import { DeleteOutlined } from "@ant-design/icons";
import { Spacer, SubTitle } from "../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Item from "antd/es/list/Item";
import UpdateLeadsNotesListDrawerModal from "./UpdateLeadsNotesListDrawerModal";

const NotesWrapper = styled.div``;

const SingleLeadsNotesForm = (props) => {
  const {
    comment,
    notes,
    noteId,
    creationDate,
    ownerName,
    userId,
    creatorId,
  } = props;
  console.log(props.rowdata.leadsId)
  console.log(props.notesId)
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
     
          <DeleteOutlined
          onClick={() => {
            const data = {
             leadsId:props.rowdata.leadsId,
               notesId:props.notesId,
           
            };
            props.removeLeadsNote(data);
          }}
           
            style={{
              color: "red",
              cursor: "pointer"
            }}
          />
           &nbsp;&nbsp;
            <BorderColorIcon
             style={{fontSize:"1rem", cursor:"pointer"}}
            onClick={() => {
              props.updateLeadsNoteDrawerModal(true);
            }}
       />
  
      </SubTitle>
    </NotesWrapper>
        <UpdateLeadsNotesListDrawerModal
        rowdata={props.rowdata}
        updatingLeadsNoteDrawerModal={props.updatingLeadsNoteDrawerModal}
           updateLeadsNoteDrawerModal={props.updateLeadsNoteDrawerModal
           }
           />
           </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  updatingLeadsNoteDrawerModal:leads.updatingLeadsNoteDrawerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeLeadsNote,
      updateLeadsNote,
      updateLeadsNoteDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleLeadsNotesForm);
