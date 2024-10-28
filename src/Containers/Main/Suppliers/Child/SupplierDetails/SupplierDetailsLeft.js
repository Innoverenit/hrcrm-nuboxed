import React, { Component , lazy, Suspense} from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
const SupplierDetailCard =lazy(()=>import("./SupplierCard/SupplierDetailCard"));
const SupplierOverViewCard =lazy(()=>import("./SupplierCard/SupplierOverViewCard"));
const SupplierOverViewDetailCard =lazy(()=>import("./SupplierCard/SupplierOverViewDetailCard"));
class SupplierDetailsLeft extends Component {
  render() {
    const { supplier } = this.props;
    return (
      <>
        <div class="flex-col block">
        <Suspense fallback={<BundleLoader />}>
          <SupplierOverViewCard  supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
          <SupplierDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
          <SupplierOverViewDetailCard supplier={supplier}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
        </Suspense>
        </div>
      </>
    );
  }
}
export default SupplierDetailsLeft;
