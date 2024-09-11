import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BrandList from "../Product/Child/BrandList"
import { BundleLoader } from "../../Components/Placeholder";
import ProductBrandModelList from "./ProductBrandModelList"
import BrandDeletedList from "./BrandDeletedList"
import { handleConfigureModal, setProductViewType } from "./ProductAction";
const ProductHeader=lazy(()=>import("./Child/ProductHeader"));
const ProductDeleteList =lazy(()=>import("./Child/ProductTable/ProductDeleteList"));
const ProductCategory =lazy(()=>import("./Child/ProductTable/ProductCategory"));
const ProductListingTable =lazy(()=>import("./Child/ProductTable/ProductListingTable"));
const ProductCardList =lazy(()=>import("./Child/ProductTable/ProductCardList"));
const ConfigureModal=lazy(()=>import("./Child/ConfigureModal"));

class Product extends Component {
  render() {
    const {
      user,
      addConfigureModal,
      handleConfigureModal,
      viewType,
      setProductViewType,
      product,
      functionName,
    } = this.props;
    return (
      <React.Fragment>
         <Suspense fallback={<BundleLoader />}>
        <ProductHeader
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          setProductViewType={setProductViewType}
          viewType={viewType}
          handleConfigureModal={handleConfigureModal}
        />
        <ConfigureModal
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          addConfigureModal={addConfigureModal}
          handleConfigureModal={handleConfigureModal}
        />


       
          {this.props.viewType === "all" ?
            (<ProductListingTable
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage} />) :
            // this.props.viewType === "dashboard" ? (
            //   <SuspendProductList />) :
              this.props.viewType === "table" ? (
                <ProductCardList 
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage} />) :
                this.props.viewType === "dashboard" ? (
                  <ProductDeleteList
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage} />) :
                  this.props.viewType === "brand" ? (
                    <BrandList
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage} />) :
                    this.props.viewType === "brandModel" ? (
                    <ProductBrandModelList
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage} />) :
                    this.props.viewType === "instate" ? (
                      <BrandDeletedList
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage} />) :
                this.props.viewType === "category" ? (
                  <ProductCategory 
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/>) :
                null}

        </Suspense>
 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ product, auth, user }) => ({
  viewType: product.viewType,
  addConfigureModal: product.addConfigureModal,
  fetchingproducts: product.fetchingproducts,
  subscriptionType: auth.userDetails.subscriptionType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleConfigureModal,
      setProductViewType,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
