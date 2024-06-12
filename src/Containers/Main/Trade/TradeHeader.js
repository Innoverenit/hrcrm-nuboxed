import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import TradeActionLeft from "./TradeActionLeft";



class TradeHeader extends Component {
    render() {
        const {
            viewType,
            setTradeViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <TradeActionLeft
                            viewType={viewType}
                            setTradeViewType={setTradeViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                        />
                    }
                    // rightComponent={<SuppliersActionRight
                    //     viewType={viewType}
                    //      />}
                />
            </div>
        );
    }
}

export default TradeHeader;
