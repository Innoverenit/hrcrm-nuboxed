import React, { Component } from 'react';
import { ActionHeader } from '../../../Components/Utils';
import ShipperDetailsHeaderLeft from "./ShipperDetailsHeaderLeft";

class ShipperDetailsHeader extends Component {
    render() {
        return (
            <div>
                <ActionHeader
                    leftComponent={<ShipperDetailsHeaderLeft
                        translatedMenuItems={this.translatedMenuItems}
                        selectedLanguage={this.props.selectedLanguage} 
                        />}
                    rightComponent={<></>}
                />
            </div>
        )
    }
}

export default ShipperDetailsHeader;