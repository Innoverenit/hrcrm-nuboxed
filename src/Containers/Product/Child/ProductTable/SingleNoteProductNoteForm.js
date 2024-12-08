import React, { useState,useRef } from "react";
import styled from "styled-components";
import { Timeline, Button, Popconfirm } from 'antd';
import dayjs from "dayjs";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { removeNotesOfProduct,updateNoteOfProduct } from "../../ProductAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {  SubTitle } from "../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Item from "antd/es/list/Item";
// import UpdateLeadsNotesListDrawerModal from "./UpdateLeadsNotesListDrawerModal";

const NotesWrapper = styled.div``;

const stripHtmlTags = (html) => {
  // Remove HTML tags using regex
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const SingleNoteProductNoteForm = (props) => {
  const [editedNotes, setEditedNotes] = useState(stripHtmlTags(props.notes)); 
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedNotes(stripHtmlTags(props.notes));
  };

  const handleUpdate = (key) => {
    props.updateNoteOfProduct({ notes: editedNotes,productionBuilderId:props.rowdata.productionBuilderId }, props.notesId);
    setEditing(false);
  };

  const toggleEditing = () => {
    if (editing) {
      handleUpdate();
    } else {
      handleEditClick();
    }
  };

  const {
    comment,
    notes,
    noteId,
    creationDate,
    ownerName,
    userId,
    creatorId,
  } = props;


  return (
    <>
    <NotesWrapper>
    {editing ? (
          <textarea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            style={{ width: "100%", minHeight: "100px" }}
          />
        ) : (
          <div>{stripHtmlTags(editedNotes)}</div>
        )}
      <SubTitle
        fontSize="0.875em"
        fontFamily="poppins"
        style={{ color: "rgb(53, 57, 61)", marginTop: "-0.75em" }}
      >
        <div class=" mt-3" />

        {`${dayjs(creationDate).fromNow()}`} {ownerName} &nbsp;&nbsp;
     
        <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  
          onClick={() => {
            const data = {
              productionBuilderId:props.rowdata.productionBuilderId,
               noteId:props.notesId,
           
            };
            props.removeNotesOfProduct(data);
          }}
           
          
          />
           &nbsp;&nbsp;
           <BorderColorIcon
            style={{ fontSize: "1rem", cursor: "pointer" }}
            onClick={toggleEditing}
          />
          {editing && (
            <>
             <Button 
                      type="primary" onClick={handleUpdate}> Update</Button>
              <Button 
                      type="primary" onClick={handleCancelClick}>
                      Cancel
                      </Button>
            </>
          )}
            </SubTitle>
    </NotesWrapper>
        {/* <UpdateLeadsNotesListDrawerModal
        rowdata={props.rowdata}
        updatingLeadsNoteDrawerModal={props.updatingLeadsNoteDrawerModal}
           updateLeadsNoteDrawerModal={props.updateLeadsNoteDrawerModal
           }
           /> */}
           </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
//   updatingLeadsNoteDrawerModal:leads.updatingLeadsNoteDrawerModal,
userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeNotesOfProduct,
      updateNoteOfProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleNoteProductNoteForm);
