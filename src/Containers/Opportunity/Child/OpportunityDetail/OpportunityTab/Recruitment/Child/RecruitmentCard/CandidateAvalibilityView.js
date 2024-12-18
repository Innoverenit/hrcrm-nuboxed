import dayjs from "dayjs";
import React, { Component } from "react";


class CandidateAvailibityView extends Component {
  render() {
    const {
      candidate: { availableDate, billing, currency },
    } = this.props;

    return (
      <>
        <CandidateItemRow
          label="Availability"
          value=
          {this.props.candidate.availableDate === null ? "None" :
          <>
          {dayjs(availableDate).format("ll")}
          </>
          }
        />
        <CandidateItemRow
          label="Billing / hr"
          value={`${billing || ""} ${currency || ""}`}
        />
      </>
    );
  }
}

export default CandidateAvailibityView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem] ">
      <div style={{ color: "#444", fontWeight: 600 }}>{label}</div>
      <div
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "-2rem" }}
      >
        {value}
      </div>
    </div>
  );
};
