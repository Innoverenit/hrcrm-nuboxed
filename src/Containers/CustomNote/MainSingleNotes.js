import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
const NotesWrapper = styled.div``;
export default function MainSingleNotes(props) {
  console.log(props);
  const {
    notes,
    creationDate,
    userId,
    creatorId,
    // metaData: {
    //   creatorDetails: { firstName, lastName }
    // }
  } = props;
  const relativeTimeString = dayjs(creationDate).format('MMMM D, YYYY h:mm A');
  return (
    <NotesWrapper>
      {/* <SubTitle fontSize='1.125em' whiteSpace='normal' fontFamily='Abel' style={{ color: '#393a3a' }}>
                {description}
            </SubTitle> */}
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <div class="text-[0.875em] font-[Karla] text-[#a7b2bc] -mt-[0.75em]">
       
        
        <div class="mt-3">
        {/* {`${dayjs(creationDate).fromNow()}`} */}
        {relativeTimeString}
          {props.ownerName}
        </div>
        {/* <b>
          {userId !== creatorId
            ? ` by ${firstName || ""} ${lastName || ""}`
            : ""}
        </b> */}
      </div>
    </NotesWrapper>
  );
}
