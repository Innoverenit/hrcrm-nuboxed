import React, {useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactInvestByContactId } from "../../ContactInvestAction";
import {  MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
const ContactInvestDetailsRight = lazy(()=>import("./ContactInvestDetailsRight"));
const ContactInvestDetailsLeft = lazy(()=>import("./ContactInvestDetailsLeft"));
const ContactInvestDetailHeader = lazy(()=>import("./ContactInvestDetailHeader"));

function ContactInvestDetails (props) {
  useEffect(()=> {
 props.getContactInvestByContactId(props.match.params.contactId);
  },[]);

    const { contactInVestDetail, fetchingContactInvestByContactId } = props;
    return (
      <>
        <>
          <ContactInvestDetailHeader    selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}/>
          {fetchingContactInvestByContactId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full">
                    <div class=" w-1/4">
                      <ContactInvestDetailsLeft contactInVestDetail={contactInVestDetail} 
                         selectedLanguage={props.selectedLanguage}
                         translateText={props.translateText}
                      />
                    </div>
                    <div class=" w-3/4">
                      <ContactInvestDetailsRight contactInVestDetail={contactInVestDetail}
                         selectedLanguage={props.selectedLanguage}
                         translateText={props.translateText} />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    ); 
}
const mapStateToProps = ({ contactinvest }) => ({
  fetchingContactInvestByContactId: contactinvest.fetchingContactInvestByContactId,
  contactInVestDetail: contactinvest.contactInVestDetail,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    getContactInvestByContactId 
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactInvestDetails)
);
