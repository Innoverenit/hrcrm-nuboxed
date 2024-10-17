import React, { Component, lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";
const SuppliersActionRight =lazy(()=>import("./SuppliersActionRight"));
const SuppliersActionLeft =lazy(()=>import("./SuppliersActionLeft"));
class SuppliersHeader extends Component {
    render() {
        const {
            viewType,
            setSuppliersViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <Suspense fallback={<BundleLoader />}>
                        <SuppliersActionLeft
                            viewType={viewType}
                            setSuppliersViewType={setSuppliersViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                            translateText={this.props.translateText}
                            translatedMenuItems={this.props.translatedMenuItems}
                            selectedLanguage={this.props.selectedLanguage}
                        /></Suspense>
                    }
                    rightComponent={
                        <Suspense fallback={<BundleLoader />}>
                        <SuppliersActionRight
                            viewType={viewType}
                            translateText={this.props.translateText}
                            translatedMenuItems={this.props.translatedMenuItems}
                            selectedLanguage={this.props.selectedLanguage}
                        /></Suspense>
                        }
                />
            </div>
        );
    }
}

export default SuppliersHeader;
