import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierBySupplierId } from "../../SuppliersAction";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
import SupplierOverViewCard from "./SupplierCard/SupplierOverViewCard";
import SupplierDetailCard from "./SupplierCard/SupplierDetailCard";
import SupplierOverViewDetailCard from "./SupplierCard/SupplierOverViewDetailCard";
import SupplierOverViewDetailCard2 from "./SupplierCard/SupplierOverViewCard2";
const  SupplierDetailsHeader =lazy(()=>import("../SupplierDetails/SupplierDetailsHeader"));
const SupplierDetailsLeft =lazy(()=>import("./SupplierDetailsLeft"));
const SupplierDetailsRight =lazy(()=>import("./SupplierDetailTab/SupplierDetailsRight"));
class SupplierDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
   this.props.getSupplierBySupplierId(this.props.match.params.supplierId);
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
       
       "875",
        "140",
        "188",  // "City",
        "1261",   // "State",
       "1236",   // "Pincode",
       "1109",  // "Country",
       "186",   // "Street" 
       "831", // "Purchase Order",
       "880",// "Inventory",
       "1235",// "Materials",
       "73",  // "Contact",
       "138",  // "Document",
       "1165", // "Activity" 
      
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 

  render() {
    const { supplier, fetchingSupplierDetailsBySupplierId } = this.props;
    return (
      <>
        <>
        <Suspense fallback={<BundleLoader />}>
          <SupplierDetailsHeader 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
              <div class="flex">
        <Suspense fallback={<BundleLoader />}>
        <div className="flex flex-col h-[4rem] w-[27%] box-border border-2 border-[#bfbdbd]  ">
          <SupplierOverViewCard  supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.state.translatedMenuItems}/>
            </div>
             <div className="flex flex-col h-[4rem] w-[20%] box-border border-2 border-[#bfbdbd] ml-gap">
          <SupplierDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.state.translatedMenuItems} />
            </div>
            <div className="flex h-[4rem] w-[30%] box-border border-2 border-[#bfbdbd] overflow-x-auto ml-gap">
          <SupplierOverViewDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} 
            translatedMenuItems={this.state.translatedMenuItems}/>
            </div>
            <div className="flex h-[4rem] w-[30%] box-border border-2 border-[#bfbdbd] overflow-x-auto ml-gap">
            <SupplierOverViewDetailCard2 supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} 
            translatedMenuItems={this.state.translatedMenuItems}/>
              </div>
        </Suspense>
        </div>
          </Suspense>
          {fetchingSupplierDetailsBySupplierId ? (
          <div class="rounded border-[#0000001f]  border  shadow-[#a3abb980] border-solid text-black m-1 p-1 w-full font-poppins overflow-auto">
              <BundleLoader />
            </div>
          ) : (
            <div>
              <Suspense fallback={"Loading..."}>
                <div class="flex flex-nowrap w-full max-sm:flex-col">
                 
                  <div class="w-[100%] max-sm:w-wk">
                    <SupplierDetailsRight supplier={supplier} 
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage}
                      translatedMenuItems={this.state.translatedMenuItems}/>
                  </div>
                </div>
              </Suspense>
            </div>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ suppliers }) => ({
    fetchingSupplierDetailsBySupplierId: suppliers.fetchingSupplierDetailsBySupplierId,
  supplier: suppliers.supplierDetailById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getSupplierBySupplierId,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SupplierDetails)
);
