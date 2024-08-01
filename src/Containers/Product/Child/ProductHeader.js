import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ProductActionLeft from "./ProductActionLeft";
import ProductActionRight from "./ProductActionRight";

class ProductHeader extends Component {
  render() {
    const { viewType, setProductViewType, handleConfigureModal } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <ProductActionLeft
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
              viewType={viewType}
              setProductViewType={setProductViewType}

            />
          }
          rightComponent={
          <ProductActionRight 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          handleConfigureModal={handleConfigureModal}
          />
        }
        />
      </div>
    );
  }
}

export default ProductHeader;
