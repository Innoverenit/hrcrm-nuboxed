import React, { Component, lazy, Suspense } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
const ShipperOverViewView =lazy(()=>import("./ShipperOverViewView"));

class ShipperOverViewCard extends Component {
    render() {
        const { shipper } = this.props;
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <Suspense fallback={"Loading..."}> <ShipperOverViewView
                                shipper={shipper}
                                translatedMenuItems={this.props.translatedMenuItems}
                                selectedLanguage={this.props.selectedLanguage}
                                
                            /></Suspense>
                        ) : null
                    }
                </ViewEditCard>
            </div>
        );
    }
}

export default ShipperOverViewCard;
