import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierBySupplierId } from "../../SuppliersAction";

import { BundleLoader } from "../../../../../Components/Placeholder";
import SupplierOverViewCard from "./SupplierCard/SupplierOverViewCard";
import SupplierDetailCard from "./SupplierCard/SupplierDetailCard";
import SupplierOverViewDetailCard from "./SupplierCard/SupplierOverViewDetailCard";
import SupplierOverViewDetailCard2 from "./SupplierCard/SupplierOverViewCard2";
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
          <SupplierDetailsHeader 
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
              <div class="flex">
        <Suspense fallback={<BundleLoader />}>
        <div className="flex flex-col h-[4rem] w-[27%] box-border border-2 border-[#bfbdbd]  ">
          <SupplierOverViewCard  supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
            </div>
             <div className="flex flex-col h-[4rem] w-[20%] box-border border-2 border-[#bfbdbd] ml-gap">
          <SupplierDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
            </div>
            <div className="flex h-[4rem] w-[30%] box-border border-2 border-[#bfbdbd] overflow-x-auto ml-gap">
          <SupplierOverViewDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
            </div>
            <div className="flex h-[4rem] w-[30%] box-border border-2 border-[#bfbdbd] overflow-x-auto ml-gap">
            <SupplierOverViewDetailCard2 supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetails)

