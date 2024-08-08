import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { SubTitle } from "../../../Components/UI/Elements";
const NotesWrapper = styled.div``;
export default function SingleNote(props) {

  const {
    comment,
    creationDate,
    userId,
    creatorId,
    // metaData: {
    //   creatorDetails: { firstName, lastName }
    // }
  } = props;
  console.log(creationDate);
  return (
    <NotesWrapper>
      {/* <SubTitle fontSize='1.125em' whiteSpace='normal' fontFamily='Abel' style={{ color: '#393a3a' }}>
                {description}
            </SubTitle> */}
      <div dangerouslySetInnerHTML={{ __html: comment }} />
      <SubTitle
        fontSize="0.875em"
        fontFamily="poppins"
        style={{ color: "rgb(53, 57, 61)", marginTop: "-0.75em" }}
      >
        <div class=" mt-3" />
        {`${dayjs(creationDate).fromNow()}`}  {props.providerName}
        {/* <b>
          {userId !== creatorId
            ? ` by ${firstName || ""} ${lastName || ""}`
            : ""}
        </b> */}
        {/* <div>
        {props.providerName}
        </div> */}
      </SubTitle>
    </NotesWrapper>
  );
}
