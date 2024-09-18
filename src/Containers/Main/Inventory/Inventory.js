import React, { Suspense, lazy,useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InventoryHeader from "./InventoryHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import { setInventoryViewType } from "./InventoryAction";
import InventoryDetail from "./Child/InventoryDetails/InventoryDetail";

const InventoryCard = lazy(() => import("./InventoryCard"));

function Inventory(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       "110", //  "Name",//0
        "1109",//   "Country",//1
        "185",//   "Address",//2
        "879",//   "Pin Code",//3
       "100", //   "New",//4
        "1070",//   "Store Config",//5
       "1071", //   "Add Zone",//6
       "1072", //   'Zone Code',//7
        "1073",//   'Rack',//8
       "1074", //   'Zone Type',//9
       "127", //   'Description',//10
       "154", //   'Submit',//11
       "1077", //   'Zone',//12
       "1078", //   'Save',//13
       "1079", //   'Cancel',//14
        "23",//   'My View',//15
       "658", //   'Location',//16
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
    <div>
      <InventoryHeader
        setInventoryViewType={props.setInventoryViewType}
        viewType={props.viewType}
        translateText={props.translateText}
        translatedMenuItems={translatedMenuItems}
        selectedLanguage={props.selectedLanguage}
      />
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table" ? 
        <InventoryCard  
        translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
          /> 
          :
        props.viewType === "zone" ? 
       <InventoryDetail
       translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
       />
        // <InventoryLocation  translateText={props.translateText}
        // translatedMenuItems={translatedMenuItems}
        // selectedLanguage={props.selectedLanguage}/>
        : null}
      </Suspense>
    </div>
  );
}

const mapStateToProps = ({ inventory }) => ({
  viewType: inventory.viewType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setInventoryViewType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
