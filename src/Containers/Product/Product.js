import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleConfigureModal, setProductViewType } from "./ProductAction";
const ProductHeader=lazy(()=>import("./Child/ProductHeader"));
const ProductDeleteList =lazy(()=>import("./Child/ProductTable/ProductDeleteList"));
const ProductCategory =lazy(()=>import("./Child/ProductTable/ProductCategory"));
const ProductListingTable =lazy(()=>import("./Child/ProductTable/ProductListingTable"));
const ProductCardList =lazy(()=>import("./Child/ProductTable/ProductCardList"));
const ConfigureModal=lazy(()=>import("./Child/ConfigureModal"));
const BrandDeletedList=lazy(()=>import("./BrandDeletedList"));
const ProductBrandModelList =lazy(()=>import("./ProductBrandModelList"));
const  BrandList=lazy(()=>import("../Product/Child/BrandList"));

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
          
         
        "85",//Add//0
        "294",//upload//1
       "104", // Create"//2
       "731", // Export Product//3
       "1625", // Upload Image//4
       "726" , // Active Products//5
       "14" ,   // Category//6
       "1607" ,   // "BrandModel//7
       "728" ,  // Suspended Products//8
       "264" , // Brand"//9
       "1069" ,  // Reinstate//10
       "1239" ,   // Search by Category Name //11
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
         <Suspense fallback={
          
          <BundleLoader/>}>
        <ProductHeader
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.state.translatedMenuItems}
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
