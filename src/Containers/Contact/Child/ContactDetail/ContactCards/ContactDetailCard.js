import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const ContactDetailView=lazy(()=> import("./ContactDetailView"));


class ContactDetailCard extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ContactDetailView
                contact={contact}
                toggleViewType={toggleViewType}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ContactDetailCard;
