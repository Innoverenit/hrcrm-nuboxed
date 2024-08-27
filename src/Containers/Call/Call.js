import React, { useState,useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleCallModal } from "./CallAction";
const AddCallModal = lazy(() => import("./Child/AddCallModal"));
const CallHeader = lazy(() => import("./Child/CallHeader"));
const CallTable = lazy(() => import("./Child/CallTable/CallTable"));

function Call (props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const { addCallModal, handleCallModal } = props;

    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
            const itemsToTranslate = [
             "104" ,// 'Create',//0
           "85",
            "71" , // 'Type',//2
           "72" ,  // 'Subject',//3
            "73"  ,// 'Contact',//4
             "74", // 'Date', //5
             "75" ,// 'Include',//6
             "76", // 'Assigned',//7
            "77",  // 'Owner',//8
             "78" ,// 'Completed',//9
             "82" ,// 'Loading',//10
              'You have reached the end of page',//11
             "222", // 'None',//12
             "118", // 'Not available',//13
             "80" ,// 'Yes',//14
             "81", // 'No',//15
             "316" ,// 'Notes',//16
             "84", // 'Delete',//17
              '',//

            ];
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
  

    return (

      <React.Fragment>
         <Suspense fallback={<BundleLoader />}>
        <CallHeader 
        handleCallModal={handleCallModal} 
        translatedMenuItems={translatedMenuItems}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
        />
        <AddCallModal
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
          addCallModal={addCallModal}
          handleCallModal={handleCallModal}

        />
        <CallTable 
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
          />

        </Suspense>
      </React.Fragment>

    );
  
}

const mapStateToProps = ({ call }) => ({
  addCallModal: call.addCallModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Call);
