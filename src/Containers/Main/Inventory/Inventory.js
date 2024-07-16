import React, { Suspense, lazy,useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InventoryHeader from "./InventoryHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import { setInventoryViewType } from "./InventoryAction";
import InventoryLocation from "./InventoryLocation";

const InventoryCard = lazy(() => import("./InventoryCard"));

function Inventory(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "Name",//0
          "Country",//1
          "Address",//2
          "Pin Code",//3
          "New",//4
          "Store Config",//5
          "Add Zone",//6
          'Zone Code',//7
          'Rack',//8
          'Zone Type',//9
          'Description',//10
          'Submit',//11
          'Zone',//12
          'Save',//13
          'Cancel',//14
          'My View',//15
          'Location',//16
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
        {props.viewType === "table" ? <InventoryCard  translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}/> :
        props.viewType === "zone" ? <InventoryLocation  translateText={props.translateText}
        translatedMenuItems={translatedMenuItems}
        selectedLanguage={props.selectedLanguage}/>
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
