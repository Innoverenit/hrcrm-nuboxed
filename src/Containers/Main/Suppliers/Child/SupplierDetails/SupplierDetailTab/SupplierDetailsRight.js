import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const  SupplierDetailsTab =lazy(()=>import("./SupplierDetailsTab"));

class SupplierDetailsRight extends Component {
  render() {

    return (
      <div class="w-full">
        <Suspense fallback={<BundleLoader />}>
          <SupplierDetailsTab supplier={this.props.supplier} 
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}/>
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
