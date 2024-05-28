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
  // state = { tabData: "1", currentId: this.props.match.params.locationDetailsId };
  useEffect(() => {
    props.getInventoryById(props.match.params.locationDetailsId);

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
  console.log(props.productionInd)
  const {
    inventory = { inventory },
    fetchingInventoryById,
    viewType1,
    setInventoryDetailViewType } = props;
  return (
    <>
      <InventoryDetailHeader
        setInventoryDetailViewType={setInventoryDetailViewType}
        viewType1={viewType1}
        inventory={inventory}
        handleResetTab={handleResetTab} />
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
                  />
                  </div>
                ) : props.viewType1 === "material" ? (
                  <div class="cursor-pointer">
                  <InventoryMaterialTab inventory={inventory} />
                  </div>
                ) : props.viewType1 === "production" && props.productionInd ? (
                  <div class="cursor-pointer">
                  <InventoryProductionTab 
                    inventory={inventory}
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
