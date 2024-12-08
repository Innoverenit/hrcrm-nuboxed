import React, { Component, lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductActionLeft=lazy(()=>import("./ProductActionLeft"));
const ProductActionRight=lazy(()=>import("./ProductActionRight"));
class ProductHeader extends Component {
  render() {
    const { viewType, setProductViewType, handleConfigureModal } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <Suspense fallback={<BundleLoader />}>
            <ProductActionLeft
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
              viewType={viewType}
              setProductViewType={setProductViewType}

            /></Suspense>
          }
          rightComponent={
            <Suspense fallback={<BundleLoader />}>
          <ProductActionRight 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          handleConfigureModal={handleConfigureModal}
          /></Suspense>
        }
        />
      </div>
    );
  }
}

export default ProductHeader;
