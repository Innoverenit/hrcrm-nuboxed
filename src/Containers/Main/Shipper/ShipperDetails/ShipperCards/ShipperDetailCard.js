import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ShipperDetailView from "./ShipperDetailView";
import ShipperViewDataEdit from "./ShipperViewDataEdit";

class ShipperDetailCard extends Component {
    render() {
        const { shipper } = this.props;
        return (
            <div>
                <ViewEditCard>
                    {({ viewType }, toggleViewType) =>
                        viewType === "view" ? (
                            <ShipperDetailView shipper={shipper}
                                toggleViewType={toggleViewType}
                                translatedMenuItems={this.props.translatedMenuItems}
                                selectedLanguage={this.props.selectedLanguage}
                            />
                        ) : (
                                <ShipperViewDataEdit
                                    shipper={shipper}
                                    toggleViewType={toggleViewType}
                                    translatedMenuItems={this.props.translatedMenuItems}
                                    selectedLanguage={this.props.selectedLanguage}
                                />
                            )
                    }

                </ViewEditCard>
            </div>
        );
    }
}

export default ShipperDetailCard;
