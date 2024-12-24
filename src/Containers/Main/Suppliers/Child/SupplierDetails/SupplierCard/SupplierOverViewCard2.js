import React, { Component,lazy, Suspense  } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const SupplierOverDetailView2 =lazy(()=>import("./SupplierOverDetailView2"));

class SupplierOverViewDetailCard2 extends Component {
  render() {
    const { supplier } = this.props;
    return (
      <div>
          <Suspense fallback={<BundleLoader />}>
        <ViewEditCard>
          
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <SupplierOverDetailView2
                supplier={supplier}
                toggleViewType={toggleViewType}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                translatedMenuItems={this.props.translatedMenuItems}
              />
            ) : null
          }
        </ViewEditCard>
        </Suspense>
      </div>
    );
  }
}

export default SupplierOverViewDetailCard2;
