import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierBySupplierId } from "../../SuppliersAction";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
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
          </Suspense>
          {fetchingSupplierDetailsBySupplierId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <div>
              <Suspense fallback={"Loading..."}>
                <div class="flex flex-nowrap w-full max-sm:flex-col">
                  <div class="w-[22%] max-sm:w-wk">
                    <SupplierDetailsLeft supplier={supplier}
                      translateText={this.props.translateText}
                      selectedLanguage={this.props.selectedLanguage} />
                  </div>
                  <div class="w-[78%] max-sm:w-wk">
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
