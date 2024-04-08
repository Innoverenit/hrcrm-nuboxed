import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductionHeader from "./Child/ProductionHeader";
import { handleCreateProduction, setProductionViewType } from "./ProductionAction";
import { BundleLoader } from "../../Components/Placeholder";
import ProductionArchieveList from "./Child/ProductionArchieveList";
const CreateProductionDrawer = lazy(() => import("./Child/CreateProductionDrawer"));
const ProductionCardView = lazy(() => import("./Child/ProductionCardView"));
const ProductionAllCardView=lazy(()=>import("./Child/ProductionAllCardView"));
const ProductionBoard=lazy(()=>import("./Child/ProductionBoard"));

function Production(props) {

  return (
    <>
      <ProductionHeader
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
          null}
      </Suspense>

    </>
  )
};

const mapStateToProps = ({ production }) => ({
  openProductiondrawer: production.openProductiondrawer,
  viewType: production.viewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCreateProduction,
      setProductionViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Production);