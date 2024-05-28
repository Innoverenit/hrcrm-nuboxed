import React, { lazy, Suspense ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductionCellList from "../Production/ProductionCellList"
import ProductionDashCard from "./ProductionDashCard"
import ProductionHeader from "./Child/ProductionHeader";
import { handleCreateProduction, setProductionViewType,getProductionTable } from "./ProductionAction";
import { BundleLoader } from "../../Components/Placeholder";
import ProductionArchieveList from "./Child/ProductionArchieveList";
const CreateProductionDrawer = lazy(() => import("./Child/CreateProductionDrawer"));
const ProductionCardView = lazy(() => import("./Child/ProductionCardView"));
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
      {props.viewType === "card" ?
        
          <ProductionCardView viewType={props.viewType} />
       
        : props.viewType === "arch" ?
          <ProductionArchieveList viewType={props.viewType} />

        : props.viewType === "all" ? 
        <ProductionAllCardView viewType={props.viewType} /> :
        props.viewType === "stage" ?
        <ProductionBoard /> :
        props.viewType === "cell" ?
        <ProductionCellList /> :
        props.viewType === "table" ?
        <ProductionDashCard 
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