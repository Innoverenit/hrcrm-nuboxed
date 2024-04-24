import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Spacer,SubTitle } from "../../../Components/UI/Elements";
const NotesWrapper = styled.div``;
export default function SingleNote(props) {
 
  const {
    notes,
    creationDate,
    userId,
    creatorId,
  } = props;
  console.log(creationDate);
  return (

    <NotesWrapper>
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <SubTitle
        fontSize="0.875em"
        fontFamily="Karla"
        style={{ color: "#a7b2bc", marginTop: "-0.75em" }}
      >
        <Spacer />
        {`${moment.utc(creationDate).fromNow()}`}  {props.ownerName}
       
        
      </SubTitle>
    </NotesWrapper>
  );
}
