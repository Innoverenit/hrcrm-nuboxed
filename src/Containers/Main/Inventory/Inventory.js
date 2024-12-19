import React, { Suspense, lazy,useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InventoryCommerceTabO from "./InventoryCommerceTabO"
import InventoryHeader from "./InventoryHeader";
import { setInventoryViewType,getInventoryById,setInventoryDetailViewType } from "./InventoryAction";
import InventoryMaterialTabO from "./InventoryMaterialTabO";
import InventoryDetailTabO from "./InventoryDetailTabO";//2
import InventorySupplierTable from "./InventorySupplierTable";
import { BundleLoader } from "../../../Components/Placeholder";

const InventoryCard = lazy(() => import("./InventoryCard"));

function Inventory(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [tabData, setTabData] = useState("1");
  const [isInitialLoad, setIsInitialLoad] = useState(true); 
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
       "1085", // 'Received',//17
       "1063",// 'Dispatch',//18
       "1082", // "Stock",//19
       "744", // 'Cell',//20
       "679", //created
       "824", //Suppliers
       "1256", // 'To Stock',//23
       "14", // 'Category',//24
       "259" ,// 'Attribute',//25
       "260", // 'Units',//26
       "1086", // 'Damaged',//27
       "1087" ,// 'Remark',//28
       "1091", // 'In Stock',//29
       "1092", // 'Ordered',//30
       "1093" ,// 'Balance',//31
       "1077", // 'Zone',//32
       "1073",  // 'Rack',//33
       "1559",
       "1703",//  Best Before35
       "1083",//Supplier36
       "771", //  Final37
       "1044",
       "800",
     "1715",//  Waste
     "1721",
     "1719",
     "1492",
     "1720",
     "268"
    

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  // useEffect(() => {
  //   const { repairInd, materialAccessInd } = props.user;

  //   if (repairInd) {
  //     props.setInventoryViewType("repair");
  //   } else if (materialAccessInd) {
  //     props.setInventoryViewType("material");
  //   } else {
  //     props.setInventoryViewType("table");
  //   }

  //   props.getInventoryById(props.match.params.locationDetailsId || props.locationId);

  //   // Set tabData based on URL params
  //   if (props.match.params.data === "Receive") {
  //     setTabData("4");
  //   } else if (props.match.params.data === "Dispatch") {
  //     setTabData("3");
  //   }
  // }, [props.match.params.locationDetailsId, props.inventory]);
  useEffect(() => {
    if (isInitialLoad) {
      const { repairInd, materialAccessInd } = props.user;;

      if (repairInd) {
        props.setInventoryViewType("repair");
      } else if (materialAccessInd) {
        props.setInventoryViewType("material");
      } else {
        props.setInventoryViewType("table");
      }

      setIsInitialLoad(false);  // Mark as no longer the initial load
    }

   // props.getInventoryById(props.match.params.locationDetailsId || props.locationId);

    // Set tabData based on URL params
    if (props.match.params.data === "Receive") {
      setTabData("4");
    } else if (props.match.params.data === "Dispatch") {
      setTabData("3");
    }
  }, [props.match.params.locationDetailsId, props.inventory]);

  const {
    inventory = { inventory },
    fetchingInventoryById,
    viewType1,
    setInventoryDetailViewType } = props;
  return (
    <div>
      <InventoryHeader
        setInventoryViewType={props.setInventoryViewType}
        viewType={props.viewType}
        translateText={props.translateText}
        translatedMenuItems={translatedMenuItems}
        selectedLanguage={props.selectedLanguage}
      />
      <Suspense fallback={ <BundleLoader/>}>
        {props.viewType === "table" ?  
        <InventoryCard  
        translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
          /> 
          : props.viewType === "material" ? 
          <InventoryMaterialTabO inventory={inventory}  
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
          
          />
          : props.viewType === "repair" ? 
          <InventoryDetailTabO
          viewType1={viewType1}
          viewType={props.viewType}
          inventory={inventory}
          tabData={tabData}
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
        />

        : props.viewType === "commerce" ? 
          <InventoryCommerceTabO
          viewType1={viewType1}
          viewType={props.viewType}
          inventory={inventory}
          tabData={tabData}
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
        />
        : props.viewType === "supplier" ? 
          <InventorySupplierTable
          viewType1={viewType1}
          inventory={inventory}
          tabData={tabData}
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

const mapStateToProps = ({ inventory,auth }) => ({
  viewType: inventory.viewType,
  inventory: inventory.inventory,
  user: auth.userDetails,
  viewType1: inventory.viewType1,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setInventoryViewType,
      getInventoryById,
      setInventoryDetailViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
