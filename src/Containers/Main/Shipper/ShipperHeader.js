import React, { Component, Suspense, lazy } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import { BundleLoader } from "../../../Components/Placeholder";

const ShipperActionLeft =lazy(()=>import("./ShipperActionLeft"));
const  ShipperActionRight =lazy(()=>import("./ShipperActionRight"));
class ShipperHeader extends Component {
    render() {
        const {
            viewType,
            setShipperViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleShipperModal,
        } = this.props;

        return (
            <>
                <ActionHeader
                    leftComponent={
                        <Suspense fallback={<BundleLoader />}>
                        <ShipperActionLeft
                            viewType={viewType}
                            setShipperViewType={setShipperViewType}
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
                        <ShipperActionRight
                             viewType={viewType}
                            handleShipperModal={handleShipperModal} 
                            translateText={this.props.translateText}
          translatedMenuItems={this.props.translatedMenuItems}
          selectedLanguage={this.props.selectedLanguage}
                            /></Suspense>
                    }
                />
            </>
        )
    }
}
export default ShipperHeader;
