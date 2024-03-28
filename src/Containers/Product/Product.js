import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import ProductHeader from "./Child/ProductHeader";
import { handleConfigureModal, setProductViewType } from "./ProductAction";
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
        <ProductHeader
          setProductViewType={setProductViewType}
          viewType={viewType}
          handleConfigureModal={handleConfigureModal}
        />
        <ConfigureModal
          addConfigureModal={addConfigureModal}
          handleConfigureModal={handleConfigureModal}
        />


        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "all" ?
            (<ProductListingTable />) :
            // this.props.viewType === "dashboard" ? (
            //   <SuspendProductList />) :
              this.props.viewType === "table" ? (
                <ProductCardList />) :
                this.props.viewType === "category" ? (
                  <ProductCategory />) :
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
