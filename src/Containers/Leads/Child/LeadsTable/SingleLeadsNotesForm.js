import React from "react";
import styled from "styled-components";
import { Timeline, Button, Popconfirm } from 'antd';
import moment from "moment";
import { removeLeadsNote } from "../../LeadsAction";
import { DeleteOutlined } from "@ant-design/icons";
import { Spacer, SubTitle } from "../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
  const handleDelete = () => {
    let data = {
      leadsId: props.rowdata.leadsId,
      notesId: noteId,
    };
     props.removeLeadsNote(data);
  };
  
  return (
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
          onClick={handleDelete()}
            style={{
              color: "red",
              cursor: "pointer"
            }}
          />
  
      </SubTitle>
    </NotesWrapper>
  );
};

const mapStateToProps = ({ customer, auth }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeLeadsNote
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleLeadsNotesForm);
