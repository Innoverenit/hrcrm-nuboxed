import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import moment from "moment";
import { Spacer,SubTitle } from "../../../../Components/UI/Elements";
const NotesWrapper = styled.div``;
export default function SingleLeadsNoteForm(props) {

  const {
    comment,
    notes,
    creationDate,
    ownerName,
    userId,
    creatorId,
   
  } = props;
//   console.log(creationDate);
  return (
    <NotesWrapper>
      {/* <SubTitle fontSize='1.125em' whiteSpace='normal' fontFamily='Abel' style={{ color: '#393a3a' }}>
                {description}
            </SubTitle> */}
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <SubTitle
        fontSize="0.875em"
        fontFamily="poppins"
        style={{ color: "rgb(53, 57, 61)", marginTop: "-0.75em" }}
      >
        <Spacer />
        {`${moment.utc(creationDate).fromNow()}`}  {ownerName}
       
       
      </SubTitle>
    </NotesWrapper>
  );
}
