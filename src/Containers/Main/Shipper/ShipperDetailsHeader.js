import React, { Component, lazy, Suspense } from 'react';
import { ActionHeader } from '../../../Components/Utils';
const ShipperDetailsHeaderLeft =lazy(()=>import("./ShipperDetailsHeaderLeft"));
class ShipperDetailsHeader extends Component {
    render() {
        return (
            <div>
                <ActionHeader
                    leftComponent={  <Suspense fallback={"Loading..."}><ShipperDetailsHeaderLeft
                        translatedMenuItems={this.props.translatedMenuItems}
                        selectedLanguage={this.props.selectedLanguage} 
                        /></Suspense>}
                    rightComponent={<></>}
                />
            </div>
        )
    }
}

export default ShipperDetailsHeader;