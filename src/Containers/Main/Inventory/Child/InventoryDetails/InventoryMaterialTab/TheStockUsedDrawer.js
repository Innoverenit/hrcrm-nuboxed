import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import StockUsedForm from "./StockUsedForm.js";

class TheStockUsedDrawer extends Component {
    render() {
        const {
            stockUseDrwr,
            handleStockUsedDrawer,
            row,
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Stock Used`}
                    width="70%"
                    visible={stockUseDrwr}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleStockUsedDrawer(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <StockUsedForm row={row} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default TheStockUsedDrawer;
