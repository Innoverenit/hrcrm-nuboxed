import React, { Component ,lazy} from "react";
const ContactOverViewCard=lazy(()=> import("./ContactCards/ContactOverViewCard"));
const ContactDetailCard=lazy(()=> import("./ContactCards/ContactDetailCard"));


class ContactDetailsLeft extends Component {
  render() {
    const { contact } = this.props;
    return (
      <>
        <div  class=" flex flex-col">
          <ContactOverViewCard contact={contact}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />
          <ContactDetailCard contact={contact} 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
          />
        </div>
      </>
    );
  }
}
export default ContactDetailsLeft;
