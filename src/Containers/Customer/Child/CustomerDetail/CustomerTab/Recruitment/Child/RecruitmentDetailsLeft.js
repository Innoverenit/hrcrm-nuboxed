import React, { Component } from "react";
import ContactAvailibityCard from "./RecruitmentCard/ContactAvailibityCard";
import ContactCatagoryCard from "./RecruitmentCard/ContactCatagoryCard";
import RecruitmentContactCard from "./RecruitmentCard/RecruitmentContactCard";

class RecruitmentDetailsLeft extends Component {
  render() {
    const { contact } = this.props;
    return (
     
      <div class=" flex flex-col flex-wrap  block items-start self-start justify-start grow shrink h-auto mr-auto ">
        <RecruitmentContactCard contact={contact} />
        <ContactCatagoryCard contact={contact} />
        <ContactAvailibityCard contact={contact} />
        {/* <TaskOppStatsCard opportunity={opportunity} />
        <TaskOppAboutCard opportunity={opportunity} /> */}
      </div>
    );
  }
}

export default RecruitmentDetailsLeft;
