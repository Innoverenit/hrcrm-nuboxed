import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactByContactId } from "../../ContactAction";
import {  MainWrapper } from "../../../../Components/UI/Layout";

import { BundleLoader } from "../../../../Components/Placeholder";
const ContactDetailsRight = lazy(()=>import("./ContactDetailsRight"));
const ContactDetailsLeft = lazy(()=>import("./ContactDetailsLeft"));
const ContactDetailHeader = lazy(()=>import("./ContactDetailHeader"));

class ContactDetails extends Component {
  componentDidMount() {
    this.props.getContactByContactId(this.props.match.params.contactId);
  }
  render() {
    const { contact, fetchingContactByContactId } = this.props;
    return (
      <>
        <>
          <ContactDetailHeader 
          
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        translatedMenuItems={this.props.translatedMenuItems}
          />
          {fetchingContactByContactId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full max-sm:flex-col">
                    <div class=" w-1/4 max-sm:w-full">
                      <ContactDetailsLeft contact={contact} 
                       translateText={this.props.translateText}
                       selectedLanguage={this.props.selectedLanguage}
                     translatedMenuItems={this.props.translatedMenuItems}
                      />
                    </div>
                    <div class=" w-3/4 max-sm:w-full">
                      <ContactDetailsRight contact={contact}
                        translateText={this.props.translateText}
                        selectedLanguage={this.props.selectedLanguage}
                      translatedMenuItems={this.props.translatedMenuItems}
                      />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ contact }) => ({
  fetchingContactByContactId: contact.fetchingContactByContactId,
  contact: contact.contact,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getContactByContactId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)

