import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import SupplierDetailsTab from "./SupplierDetailsTab";

class SupplierDetailsRight extends Component {
  render() {

    return (
      <div class="w-full">
        <Suspense fallback={<BundleLoader />}>
          <SupplierDetailsTab supplier={this.props.supplier} />
        </Suspense>
      </div>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDetailsRight);
