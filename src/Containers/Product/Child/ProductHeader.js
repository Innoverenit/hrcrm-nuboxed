import React, { Component, lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductActionLeft=lazy(()=>import("./ProductActionLeft"));
const ProductActionRight=lazy(()=>import("./ProductActionRight"));
class ProductHeader extends Component {
  render() {
    const { viewType, setProductViewType, handleConfigureModal } = this.props;
    console.log(this.props.translatedMenuItems)
    return (
      <div>
        <ActionHeader
          leftComponent={
            <Suspense fallback={"Loading..."}>
            <ProductActionLeft
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
              viewType={viewType}
              setProductViewType={setProductViewType}
              translatedMenuItems={this.props.translatedMenuItems}
            /></Suspense>
          }
          rightComponent={
            <Suspense fallback={"Loading..."}>
          <ProductActionRight 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          handleConfigureModal={handleConfigureModal}
          translatedMenuItems={this.props.translatedMenuItems}
          /></Suspense>
        }
        />
      </div>
    );
  }
}

export default ProductHeader;
