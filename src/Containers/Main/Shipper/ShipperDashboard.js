import React, {  Suspense } from 'react';
import { BundleLoader } from "../../../Components/Placeholder";
import ShipperJumpstart from './ShipperJumpstart';

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
                <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto mt-[0.3rem] ">
                <div class="block box-border h-auto w-1/3">
                        <ChartTab />
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        <ChartTab2 />
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        <ChartTab3 />
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        <ChartTab4 />
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        <ChartTab5 />
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        <ChartTab6 />
                    </div>

                </div>
            </Suspense>
        </>
    )
}

export default ShipperDashboard;
