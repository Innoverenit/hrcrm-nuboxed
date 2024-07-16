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
              'Create',//0
              'Add',//1
              'Type',//2
              'Subject',//3
              'Contact',//4
              'Date', //5
              'Include',//6
              'Assigned To',//7
              'Owner',//8
              'Completed',//9
              'Loading',//10
              'You have reached the end of page',//11
              'None',//12
              'Not available',//13
              'Yes',//14
              'No',//15
              'Notes',//16
              'Delete',//17
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

        <Suspense fallback={<BundleLoader />}>
        
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
