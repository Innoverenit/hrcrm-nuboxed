import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const NotesWrapper = styled.div``;
export default function SingleNote(props) {
  console.log(creationDate);
  const {
    notes,
    creationDate,
    userId,
    creatorId,

  } = props;
  return (
    <NotesWrapper>
    
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <div className=" text-sm font-poppins" style={{ color: "rgb(53, 57, 61)", marginTop: "-0.75em" }}
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
      </div>
    </NotesWrapper>
  );
}
