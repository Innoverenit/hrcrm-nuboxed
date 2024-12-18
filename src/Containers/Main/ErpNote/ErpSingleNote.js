import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';


const NotesWrapper = styled.div``;
export default function ErpSingleNote(props) {
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
  dayjs.extend(relativeTime);
  
  const formattedDate = dayjs(creationDate).format('MMMM D, YYYY h:mm A');
  const relativeTimeString = dayjs(creationDate).fromNow();
  return (
    <NotesWrapper>
      {/* <SubTitle fontSize='1.125em' whiteSpace='normal' fontFamily='Abel' style={{ color: '#393a3a' }}>
                {description}
            </SubTitle> */}
      <div dangerouslySetInnerHTML={{ __html: notes }} />
      <div class="text-[0.875em] font-[Karla] text-[#a7b2bc] -mt-[0.75em]">
       
        
        <div class="mt-3">
        {/* {`${moment(creationDate).fromNow()}`}  */}
        {/* {formattedDate}  */}
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
