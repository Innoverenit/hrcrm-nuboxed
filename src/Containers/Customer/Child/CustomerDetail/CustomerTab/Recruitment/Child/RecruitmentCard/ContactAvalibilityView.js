import dayjs from "dayjs";
import React, { Component } from "react";

import { SubTitle } from "../../../../../../../../Components/UI/Elements";


class ContactAvailibityView extends Component {
  render() {
    const {
      contact: { availableDate, billing, currency },
    } = this.props;

    return (
      <>
        <ContactItemRow
          label="Availability"
         
          value={dayjs(availableDate).format("ll")}
        />
        <ContactItemRow
          label="Billing / hr"
          value={`${billing || ""} ${currency || ""}`}
        />
      </>
    );
  }
}

export default ContactAvailibityView;

const ContactItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem]">
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "-2rem" }}
      >
        {value}
      </SubTitle>
    </div>
  );
};
