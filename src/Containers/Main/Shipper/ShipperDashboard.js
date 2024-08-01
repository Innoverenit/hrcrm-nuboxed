import React, {  Suspense } from 'react';
import { BundleLoader } from "../../../Components/Placeholder";
import ShipperJumpstart from './ShipperJumpstart';
import {
    ResponsiveBox,
    FlexContainer
} from "../../../Components/UI/Layout";
import ChartTab from './ChartTab';
import ChartTab2 from './ChartTab2';
import ChartTab3 from './ChartTab3';
import ChartTab4 from "./ChartTab4";
import ChartTab5 from "./ChartTab5";
import ChartTab6 from "./ChartTab6";

function ShipperDashboard() {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <ShipperJumpstart />
                <FlexContainer style={{ marginTop: "0.3rem" }}>
                    <ResponsiveBox>
                        <ChartTab />
                    </ResponsiveBox>

                    <ResponsiveBox>
                        <ChartTab2 />
                    </ResponsiveBox>

                    <ResponsiveBox>
                        <ChartTab3 />
                    </ResponsiveBox>

                    <ResponsiveBox>
                        <ChartTab4 />
                    </ResponsiveBox>

                    <ResponsiveBox>
                        <ChartTab5 />
                    </ResponsiveBox>

                    <ResponsiveBox>
                        <ChartTab6 />
                    </ResponsiveBox>

                </FlexContainer>
            </Suspense>
        </>
    )
}

export default ShipperDashboard;
