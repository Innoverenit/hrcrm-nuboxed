import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactByContactId } from "../../ContactAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { useParams } from "react-router-dom";
const ContactDetailsRight = lazy(() => import("./ContactDetailsRight"));
const ContactDetailsLeft = lazy(() => import("./ContactDetailsLeft"));
const ContactDetailHeader = lazy(() => import("./ContactDetailHeader"));

function ContactDetails (props) { 
    const { contactId } = useParams();
  useEffect(() => {
    props.getContactByContactId(contactId);
  }, [contactId]);
  const { contact, fetchingContactByContactId,translateText,selectedLanguage,translatedMenuItems } = props;
  return (
    <>
      <ContactDetailHeader
      contact={contact}
      fetchingContactByContactId={fetchingContactByContactId}
        translateText={translateText}
        selectedLanguage={selectedLanguage}
        translatedMenuItems={translatedMenuItems}
      />
      {fetchingContactByContactId ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
        <div>
          <Suspense fallback={"Loading..."}>
            <div className="flex flex-nowrap w-full max-sm:flex-col">
              <div className="w-1/4 max-sm:w-full">
                <ContactDetailsLeft
                  contact={contact}
                  translateText={translateText}
                  selectedLanguage={selectedLanguage}
                  translatedMenuItems={translatedMenuItems}
                />
              </div>
              <div className="w-3/4 max-sm:w-full">
                <ContactDetailsRight
                  contact={contact}
                  translateText={translateText}
                  selectedLanguage={selectedLanguage}
                  translatedMenuItems={translatedMenuItems}
                />
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ contact }) => ({
  fetchingContactByContactId: contact.fetchingContactByContactId,
  contact: contact.contact,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getContactByContactId }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)