import React, { lazy, Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInventoryById, setInventoryDetailViewType } from "../../InventoryAction";
import { MainWrapper } from "../../../../../Components/UI/Layout";

import { BundleLoader } from "../../../../../Components/Placeholder";
import InventoryDetailTab from "./InventoryDetailTab/InventoryDetailTab";
import InventoryMaterialTab from "./InventoryMaterialTab/InventoryMaterialTab";
import InventoryProductionTab from "./InventoryProductionTab/InventoryProductionTab";
const InventoryDetailHeader = lazy(() => import("./InventoryDetailHeader"));
const InventoryDetailRight = lazy(() => import("./InventoryDetailRight"));


function InventoryDetail(props) {
  const [tabData, setTabData] = useState("1");

  useEffect(() => {
    props.getInventoryById(props.match.params.locationDetailsId||props.locationId);

    if (props.match.params.data === "Receive") {
      // alert("f");
      setTabData("4");
    } else if (props.match.params.data === "Dispatch") {
      setTabData("3");
    }
  }, [props.match.params.locationDetailsId]);
  function handleResetTab() {
    setTabData("1");
  }
  const {
    inventory = { inventory },
    fetchingInventoryById,
    viewType1,
    setInventoryDetailViewType } = props;

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
         "796", //  "Material",//0
           "203", // "Production",//1
            "661",// "Repair",//2
            "45",// "Back",//3
            "100",// "New",//4
          "1080",  // "Receive",//5
           "1082", // "Stock",//6
           "744", // 'Cell',//7
            "1063",// 'Dispatch',//8
           "922" ,// 'Archive',//9
           "82" ,// 'Loading',//10
            "679",// 'Created',//11
           "1083", // 'Supplier',//12
           "100",// 'New',//13
           "1256", // 'To Stock',//14
           "110" ,// 'Name',//15
           "14", // 'Category',//16
           "259" ,// 'Attribute',//17
           "260", // 'Units',//18
           "1085", // 'Received',//19
       "1086", // 'Damaged',//20
           "1087" ,// 'Remark',//21
           "104", // 'Create',//22
         "85" ,  // 'Add',//23
          "1079",  // 'Cancel',//24
           "1088", // 'Check for',//25
           "1089", // 'Generate',//26
           "1090", // 'Select from existing',//27
          "1250" , // 'Change Status',//28
           "1091", // 'In Stock',//29
           "1092", // 'Ordered',//30
           "1093" ,// 'Balance',//31
           "1077", // 'Zone',//32
          "1073",  // 'Rack',//33
          "1078",  // 'Save',//34
          "1042",  // 'Manufacture',//35
           "778", // 'To Dispatch',//36
            "1052",// 'Store',//37
          "1251",// 'You have reached the end of page',//38
          "1095" , // 'Send To Store',//39
          "170",  // 'Edit',//40
          "1252",  //  'Print',//41
           "1097", // 'Dispatch By',//42
          "1253", // 'list for',//43
           "657", // 'Price',//44
          "1086" , // 'Damage',//45
          "771",  // 'Final',//46
          "1098" , // 'Select Zone',//47
           "1044", // 'Item',//48
             "1254", // 'System',//49
         "2056"   // 'Part',//50
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
    <>
      <InventoryDetailHeader
        setInventoryDetailViewType={setInventoryDetailViewType}
        viewType1={viewType1}
        inventory={inventory}
        handleResetTab={handleResetTab} 
        translateText={props.translateText}
        translatedMenuItems={translatedMenuItems}
        selectedLanguage={props.selectedLanguage}
        />
      {fetchingInventoryById ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
        <div class=" flex ">
          <Suspense fallback={"Loading..."}>
            <div class=" flex flex-no-wrap w-full" >
              <div class=" w-full" >
                {/* <InventoryDetailRight
                  viewType1={viewType1}
                  inventory={inventory}
                  tabData={tabData}
                /> */}
                {props.viewType1 === "repair" && props.repairInd ? (
                  <div class="cursor-pointer">
                  <InventoryDetailTab
                    viewType1={viewType1}
                    inventory={inventory}
                    tabData={tabData}
                    translateText={props.translateText}
                    translatedMenuItems={translatedMenuItems}
                    selectedLanguage={props.selectedLanguage}
                  />
                  </div>
                ) : props.viewType1 === "material" ? (
                  <div class="cursor-pointer">
                  <InventoryMaterialTab inventory={inventory}  translateText={props.translateText}
        translatedMenuItems={translatedMenuItems}
        selectedLanguage={props.selectedLanguage}
        
        />
                  </div>
                ) : props.viewType1 === "production" && props.productionInd ? (
                  <div class="cursor-pointer">
                  <InventoryProductionTab 
                    inventory={inventory}
                    translateText={props.translateText}
                    translatedMenuItems={translatedMenuItems}
                    selectedLanguage={props.selectedLanguage}
                  />
                  </div>
                ) : null}
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
}
const mapStateToProps = ({ inventory, auth }) => ({
  fetchingInventoryById: inventory.fetchingInventoryById,
  inventory: inventory.inventoryDetailById,
  viewType1: inventory.viewType1,
  locationId: auth.userDetails.locationId,
  productionInd: auth.userDetails.productionInd,
  repairInd: auth.userDetails.repairInd,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventoryById,
      setInventoryDetailViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetail)

