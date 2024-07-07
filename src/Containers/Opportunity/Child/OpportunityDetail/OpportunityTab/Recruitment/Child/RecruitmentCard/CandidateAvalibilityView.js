import dayjs from "dayjs";
import React, { Component } from "react";
import { SubTitle } from "../../../../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

class CandidateAvailibityView extends Component {
  render() {
    const {
      candidate: { availableDate, billing, currency },
    } = this.props;

    return (
      <>
        <CandidateItemRow
          //label="Availability"
          label={<FormattedMessage
            id="app.availability"
            defaultMessage="Availability"
          />}
          value=
          {this.props.candidate.availableDate === null ? "None" :
          <>
          {dayjs(availableDate).format("ll")}
          </>
          }
        />
        <CandidateItemRow
          //label="Billing / hr"
          label={<FormattedMessage
            id="app.billing/hr"
            defaultMessage="Billing / hr"
          />}
          value={`${billing || ""} ${currency || ""}`}
        />
      </>
    );
  }
}

export default CandidateAvailibityView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "-2rem" }}
      >
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
