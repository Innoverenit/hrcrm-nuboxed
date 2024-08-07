import React, { Component, lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ProductionActionRight from "./ProductionActionRight";
import ProductionActionLeft from "./ProductionActionLeft";
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
            <ProductionActionLeft
              setProductionViewType={setProductionViewType}
              viewType={viewType} />
          }
          rightComponent={
            <ProductionActionRight
            fetchingProductionTable={this.props.fetchingProductionTable}
            productionTableData={this.props.productionTableData}
            viewType={viewType} 
              openProductiondrawer={openProductiondrawer}
              handleCreateProduction={handleCreateProduction}
            />
          }
        />
      </div>
    );
  }
}

export default ProductionHeader;
