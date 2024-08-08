import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {SubTitle } from "../../../Components/UI/Elements";
const NotesWrapper = styled.div``;
export default function SingleNote(props) {
  console.log(creationDate);
  const {
    notes,
    creationDate,
    userId,
    creatorId,
    // metaData: {
    //   creatorDetails: { firstName, lastName }
    // }
  } = props;
  return (
    <NotesWrapper>
      {/* <SubTitle fontSize='1.125em' whiteSpace='normal' fontFamily='Abel' style={{ color: '#393a3a' }}>
                {description}
            </SubTitle> */}
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <SubTitle
        fontSize="0.875em"
        fontFamily="Karla"
        style={{ color: "#a7b2bc", marginTop: "-0.75em" }}
      >
        <div class=" mt-3" />
        {`${dayjs(creationDate).fromNow()}`}
        {/* <b>
          {userId !== creatorId
            ? ` by ${firstName || ""} ${lastName || ""}`
            : ""}
        </b> */}
        <div>
        {props.ownerName}
        </div>
      </SubTitle>
    </NotesWrapper>
  );
}
