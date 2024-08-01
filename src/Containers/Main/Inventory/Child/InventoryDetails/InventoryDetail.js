import React, { lazy, Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInventoryById, setInventoryDetailViewType } from "../../InventoryAction";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
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
           "Material",//0
            "Production",//1
            "Repair",//2
            "Back",//3
            "New",//4
            "Receive",//5
            "Stock",//6
            'Cell',//7
            'Dispatch',//8
            'Archive',//9
            'Loading',//10
            'Created',//11
            'Supplier',//12
            'New',//13
            'To Stock',//14
            'Name',//15
            'Category',//16
            'Attribute',//17
            'Units',//18
            'Received',//19
            'Damaged',//20
            'Remark',//21
            'Create',//22
            'Add',//23
            'Cancel',//24
            'Check for',//25
            'Generate',//26
            'Select from existing',//27
            'Change Status',//28
            'In Stock',//29
            'Ordered',//30
            'Balance',//31
            'Zone',//32
            'Rack',//33
            'Save',//34
            'Manufacture',//35
            'To Dispatch',//36
            'Store',//37
            'You have reached the end of page',//38
            'Send To Store',//39
            'Edit',//40
            'Print',//41
            'Dispatch By',//42
            'list for',//43
            'Price',//44
            'Damage',//45
            'Final',//46
            'Select Zone',//47
            'Item',//48
            'System',//49
            'Part',//50
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
        selectedLanguage={props.selectedLanguage}/>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetail)
);
