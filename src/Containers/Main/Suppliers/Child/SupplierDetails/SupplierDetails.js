import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierBySupplierId } from "../../SuppliersAction";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
import SupplierOverViewCard from "./SupplierCard/SupplierOverViewCard";
import SupplierDetailCard from "./SupplierCard/SupplierDetailCard";
import SupplierOverViewDetailCard from "./SupplierCard/SupplierOverViewDetailCard";
const  SupplierDetailsHeader =lazy(()=>import("../SupplierDetails/SupplierDetailsHeader"));
const SupplierDetailsLeft =lazy(()=>import("./SupplierDetailsLeft"));
const SupplierDetailsRight =lazy(()=>import("./SupplierDetailTab/SupplierDetailsRight"));
class SupplierDetails extends Component {
  componentDidMount() {
   this.props.getSupplierBySupplierId(this.props.match.params.supplierId);
  }
  render() {
    const { supplier, fetchingSupplierDetailsBySupplierId } = this.props;
    return (
      <>
        <>
        <Suspense fallback={<BundleLoader />}>
        <div class="flex">
          <SupplierDetailsHeader 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
            
        <Suspense fallback={<BundleLoader />}>
        <div className="flex flex-col">
          <SupplierOverViewCard  supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
           
           
          <SupplierDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
           
         
          <SupplierOverViewDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
            </div>
        </Suspense>
        </div>
          </Suspense>
          {fetchingSupplierDetailsBySupplierId ? (
          <div class="rounded shadow-[0em 0.25em 0.625em -0.125em] border-solid text-black m-1 p-1 w-full  font-poppins overflow-auto">
          

              <BundleLoader />
            </div>
          ) : (
            <div>
              <Suspense fallback={"Loading..."}>
                <div class="flex flex-nowrap w-3/4 max-sm:flex-col">
                 
                  <div class="w-full max-sm:w-wk">
                    <SupplierDetailsRight supplier={supplier} 
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage}/>
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
