import React, {useEffect, lazy, Suspense ,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactInvestByContactId } from "../../ContactInvestAction";
import {  MainWrapper } from "../../../../Components/UI/Layout";
import { useParams } from "react-router-dom";
import { BundleLoader } from "../../../../Components/Placeholder";
const ContactInvestDetailsRight = lazy(()=>import("./ContactInvestDetailsRight"));
const ContactInvestDetailsLeft = lazy(()=>import("./ContactInvestDetailsLeft"));
const ContactInvestDetailHeader = lazy(()=>import("./ContactInvestDetailHeader"));

function ContactInvestDetails (props) {
  const { contactId } = useParams();
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
 props.getContactInvestByContactId(contactId);
  },[contactId]);

   useEffect(() => {
            const fetchMenuTranslations = async () => {
              try {
                setLoading(true); 
                const itemsToTranslate = [
                  "277", // Company 0
                  "326", // Department 1
                  "325", // Designation 2
                  "279", // Source 3 
                  "140",//  Email 4
                  "299",  //Mobile # 5
              
               
        
                ];
        
                const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
                setTranslatedMenuItems(translations);
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.error('Error translating menu items:', error);
              }
            };
        
            fetchMenuTranslations();
          }, [props.selectedLanguage]);

    const { contactInVestDetail, fetchingContactInvestByContactId } = props;
    return (
      <>
        <>
        <Suspense fallback={"Loading..."}>
          <ContactInvestDetailHeader  
            contactInVestDetail={contactInVestDetail} 
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}/>
            </Suspense>
          {fetchingContactInvestByContactId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full">
                    <div class=" w-1/4">
                      <ContactInvestDetailsLeft 
                      contactInVestDetail={contactInVestDetail} 
                         selectedLanguage={props.selectedLanguage}
                         translateText={props.translateText}
                         translatedMenuItems={translatedMenuItems}
                      />
                    </div>
                    <div class=" w-3/4">
                      <ContactInvestDetailsRight contactInVestDetail={contactInVestDetail}
                         selectedLanguage={props.selectedLanguage}
                         translateText={props.translateText}
                         translatedMenuItems={translatedMenuItems} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestDetails)

