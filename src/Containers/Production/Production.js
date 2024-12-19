import React, { lazy, Suspense ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleCreateProduction, setProductionViewType,getProductionTable } from "./ProductionAction";
import { BundleLoader } from "../../Components/Placeholder";

const ProductionBatchCard = lazy(() => import("../Production/ProductionBatchCard"));
const ProductionCellList = lazy(() => import("../Production/ProductionCellList"));
const ProductionDashCard = lazy(() => import("./ProductionDashCard"));
const ProductionHeader=lazy(()=>import("./Child/ProductionHeader"));
const ProductionArchieveList=lazy(()=>import("./Child/ProductionArchieveList"));
const CreateProductionDrawer = lazy(() => import("./Child/CreateProductionDrawer"));
const ProductionAllCardView=lazy(()=>import("./Child/ProductionAllCardView"));
const ProductionBoard=lazy(()=>import("./Child/ProductionBoard"));

function Production(props) {
  useEffect(() => {
    props.getProductionTable(props.userId);
    // setPage(page + 1);
    // props.getRoomRackByLocId(props.locationId, props.orgId);
}, []);
  return (
    <>
      <ProductionHeader
       fetchingProductionTable={props.fetchingProductionTable}
       productionTableData={props.productionTableData}
        setProductionViewType={props.setProductionViewType}
        viewType={props.viewType}
        openProductiondrawer={props.openProductiondrawer}
        handleCreateProduction={props.handleCreateProduction}
      />
      <CreateProductionDrawer
        openProductiondrawer={props.openProductiondrawer}
        handleCreateProduction={props.handleCreateProduction}
      />
<Suspense fallback={<BundleLoader />}>
      { props.viewType === "arch" ?
          <ProductionArchieveList 
          viewType={props.viewType} 
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          />

        : props.viewType === "all" ? 
        <ProductionAllCardView 
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        viewType={props.viewType} /> :
        props.viewType === "stage" ?
        <ProductionBoard /> :
        props.viewType === "cell" ?
        <ProductionCellList /> :
        props.viewType === "batch" ?
        <ProductionBatchCard /> :
        props.viewType === "table" ?
        <ProductionDashCard 
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        fetchingProductionTable={props.fetchingProductionTable}
        productionTableData={props.productionTableData}
        /> :
          null}
      </Suspense>

    </>
  )
};

const mapStateToProps = ({ production,auth }) => ({
  openProductiondrawer: production.openProductiondrawer,
  viewType: production.viewType,
  fetchingProductionTable:production.fetchingProductionTable,
  productionTableData:production.productionTableData,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCreateProduction,
      setProductionViewType,
      getProductionTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Production);