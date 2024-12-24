import React, { Component , lazy, Suspense} from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const SupplierDetailView =lazy(()=>import("./SupplierDetailView"));
const SupplierViewDataEdit =lazy(()=>import("./SupplierViewDataEdit"));
class SupplierDetailCard extends Component {
    render() {
        const { supplier } = this.props;
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <Suspense fallback={<BundleLoader />}>
                            <SupplierDetailView supplier={supplier}
                                toggleViewType={toggleViewType}
                                translateText={this.props.translateText}
                                selectedLanguage={this.props.selectedLanguage}
                                translatedMenuItems={this.props.translatedMenuItems}/></Suspense>
                        ) : (
                            <Suspense fallback={<BundleLoader />}>
                                <SupplierViewDataEdit
                                    supplier={supplier}
                                    toggleViewType={toggleViewType}
                                    translateText={this.props.translateText}
                                    selectedLanguage={this.props.selectedLanguage} /></Suspense>
                            )
                    }

                </ViewEditCard>
            </div>
        );
    }
}

export default SupplierDetailCard;
