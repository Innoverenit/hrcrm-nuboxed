import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSupplierBySupplierId } from "../../SuppliersAction";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
import SupplierDetailsHeader from "../SupplierDetails/SupplierDetailsHeader"
import SupplierDetailsLeft from "./SupplierDetailsLeft";
import SupplierDetailsRight from "./SupplierDetailTab/SupplierDetailsRight";

class SupplierDetails extends Component {
  componentDidMount() {
   this.props.getSupplierBySupplierId(this.props.match.params.supplierId);
  }
  render() {
    const { supplier, fetchingSupplierDetailsBySupplierId } = this.props;
    return (
      <>
        <>
          <SupplierDetailsHeader />
          {fetchingSupplierDetailsBySupplierId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <div>
              <Suspense fallback={"Loading..."}>
                <div class="flex flex-nowrap w-full max-sm:flex-col">
                  <div class="w-[22%] max-sm:w-wk">
                    <SupplierDetailsLeft supplier={supplier} />
                  </div>
                  <div class="w-[78%] max-sm:w-wk">
                    <SupplierDetailsRight supplier={supplier} />
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
