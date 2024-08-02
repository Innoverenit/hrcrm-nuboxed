import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const NotesWrapper = styled.div``;

const UpdateSingleNote = (props) => {
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
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <SubTitle
        fontSize="0.875em"
        fontFamily="poppins"
        style={{ color: "rgb(53, 57, 61)", marginTop: "-0.75em" }}
      >
        <mt-3 />
        {`${dayjs.utc(creationDate).fromNow()}`} {ownerName} &nbsp;&nbsp;
       
      </SubTitle>
    </NotesWrapper>     
           </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  updatingLeadsNoteDrawer:leads.updatingLeadsNoteDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSingleNote);
