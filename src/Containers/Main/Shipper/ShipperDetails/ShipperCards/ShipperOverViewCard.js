import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ShipperOverViewView from "./ShipperOverViewView";

class ShipperOverViewCard extends Component {
    render() {
        const { shipper } = this.props;
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <ShipperOverViewView
                                shipper={shipper}
                            />
                        ) : null
                    }
                </ViewEditCard>
            </div>
        );
    }
}

export default ShipperOverViewCard;
