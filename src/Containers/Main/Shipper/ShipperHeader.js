import React, { Component } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import ShipperActionLeft from './ShipperActionLeft';
import ShipperActionRight from './ShipperActionRight';

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
                        <ShipperActionLeft
                            viewType={viewType}
                            setShipperViewType={setShipperViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                            translateText={this.props.translateText}
          translatedMenuItems={this.props.translatedMenuItems}
          selectedLanguage={this.props.selectedLanguage}
                        />
                    }
                    rightComponent={
                        <ShipperActionRight
                             viewType={viewType}
                            handleShipperModal={handleShipperModal} 
                            translateText={this.props.translateText}
          translatedMenuItems={this.props.translatedMenuItems}
          selectedLanguage={this.props.selectedLanguage}
                            />
                    }
                />
            </>
        )
    }
}
export default ShipperHeader;
