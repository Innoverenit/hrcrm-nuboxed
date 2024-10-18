import React, { Component } from "react";
import { Link } from "../../../../Components/Common";

class ContactDetailView extends Component {
  render() {
    console.log("contactId", this.props.contactId);
    return (
      <>
        <Link
          toUrl={`contact/${this.props.contactId}`}
          title={`${this.props.contactName}`}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
        />
      </>
    );
  }
}
export default ContactDetailView;
