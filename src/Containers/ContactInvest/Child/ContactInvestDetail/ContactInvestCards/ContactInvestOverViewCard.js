
import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ContactInvestOverView from "./ContactInvestOverView";

class ContactInvestOverViewCard extends Component {
  render() {
    const { contactInVestDetail } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? <ContactInvestOverView contactInVestDetail={contactInVestDetail} 
          selectedLanguage={this.props.selectedLanguage}
          translateText={this.props.translateText}
            /> : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactInvestOverViewCard;
