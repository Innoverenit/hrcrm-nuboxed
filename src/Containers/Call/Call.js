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
            "71" , // 'Type',//1
           "72" ,  // 'Subject',//2
            "73"  ,// 'Contact',//3
             "74", // 'Date', //4
             "78" ,// 'Completed',//5
             "75" ,// 'Include',//6
             "76", // 'Assigned',//7
            "77",  // 'Owner',//8
             "82" ,// 'Loading',//9
             "222", // 'None',//10
             "118", // 'Not available',//11
             "80" ,// 'Yes',//12
             "81", // 'No',//13
             "316" ,// 'Notes',//14
             "84", // 'Delete',//15   
             "85"         //Add 16

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
