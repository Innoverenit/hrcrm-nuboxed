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
                        <Suspense fallback={"Loading..."}>
                        <SuppliesActionLeft
                        translateText={this.props.translateText}
                        selectedLanguage={this.props.selectedLanguage}
                        translatedMenuItems={this.props.translatedMenuItems}
                            viewType={viewType}
                            setSuppliesViewType={setSuppliesViewType} 
                        /></Suspense>
                    }
                    rightComponent={
                        <Suspense >
                            <SuppliesActionRight 
                        viewType={viewType}
                        translatedMenuItems={this.props.translatedMenuItems}
                        translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                    
                    /></Suspense>}
                />
            </div>
        );
    }
}

export default SuppliesHeader;
