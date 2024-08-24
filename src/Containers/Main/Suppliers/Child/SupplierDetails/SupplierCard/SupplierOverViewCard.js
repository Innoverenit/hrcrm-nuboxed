import React, { Component, lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const SupplierOverViewView =lazy(()=>import("./SupplierOverViewView"));

class SupplierOverViewCard extends Component {
    render() {
        const { supplier } = this.props;
        return (
            <div>
                 <Suspense fallback={<BundleLoader />}>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <SupplierOverViewView
                            supplier={supplier}
                            translateText={this.props.translateText}
                            selectedLanguage={this.props.selectedLanguage}
                            />
                        ) : null
                    }
                </ViewEditCard>
                </Suspense>
            </div>
        );
    }
}

export default SupplierOverViewCard;
