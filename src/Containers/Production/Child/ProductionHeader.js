import React, { Component, lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";

const ProductionActionLeft = lazy(() => import("./ProductionActionLeft"));
const ProductionActionRight = lazy(() => import("./ProductionActionRight"));
class ProductionHeader extends Component {
  render() {
    const {
      viewType,
      openProductiondrawer,
      handleCreateProduction,
      setProductionViewType
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <Suspense>
            <ProductionActionLeft
              setProductionViewType={setProductionViewType}
              viewType={viewType} /></Suspense>
          }
          rightComponent={
            <Suspense>
            <ProductionActionRight
            fetchingProductionTable={this.props.fetchingProductionTable}
            productionTableData={this.props.productionTableData}
            viewType={viewType} 
              openProductiondrawer={openProductiondrawer}
              handleCreateProduction={handleCreateProduction}
            /></Suspense>
          }
        />
      </div>
    );
  }
}

export default ProductionHeader;
