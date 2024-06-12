import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import OrderActionLeft from "./OrderActionLeft";

class OrderHeader extends Component {
    render() {
        const {
            viewType,
            setOrderViewType,
            activeKey,
            activeKey1
        } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <OrderActionLeft
                            viewType={viewType}
                            setOrderViewType={setOrderViewType}
                            activeKey={activeKey}
                            activeKey1={activeKey1}
                        />
                    }
                // rightComponent={<SuppliersActionRight />}
                />
            </div>
        );
    }
}

export default OrderHeader;
