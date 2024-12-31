import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import OrderActionLeft from "./OrderActionLeft";

class OrderHeader extends Component {
    render() {
        const {
            viewType,
            setOrderViewType,
            activeKey,
            activeKey1,
            translatedMenuItems
        } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <OrderActionLeft
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText}
                            viewType={viewType}
                            setOrderViewType={setOrderViewType}
                            handleViewChange={this.props.handleViewChange}
                            activeKey={activeKey}
                            activeKey1={activeKey1}
                            translatedMenuItems={translatedMenuItems}
                        />
                    }
                // rightComponent={<SuppliersActionRight />}
                />
            </div>
        );
    }
}

export default OrderHeader;
