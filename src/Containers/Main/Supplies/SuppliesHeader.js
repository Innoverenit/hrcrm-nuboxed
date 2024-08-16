import React, { Component, lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";

const SuppliesActionLeft =lazy(()=>import("./SuppliesActionLeft"));
const SuppliesActionRight =lazy(()=>import("./SuppliesActionRight"));
class SuppliesHeader extends Component {
    render() {
        const { viewType, setSuppliesViewType, handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <Suspense fallback={<BundleLoader />}>
                        <SuppliesActionLeft
                        translateText={this.props.translateText}
                        selectedLanguage={this.props.selectedLanguage}
                            viewType={viewType}
                            setSuppliesViewType={setSuppliesViewType}
                        /></Suspense>
                    }
                    rightComponent={
                        <Suspense fallback={<BundleLoader />}>
                            <SuppliesActionRight 
                        viewType={viewType}
                        translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                    /></Suspense>}
                />
            </div>
        );
    }
}

export default SuppliesHeader;
