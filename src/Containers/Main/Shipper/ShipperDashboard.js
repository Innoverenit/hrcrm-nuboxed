import React, {  Suspense } from 'react';
import { BundleLoader } from "../../../Components/Placeholder";
import ShipperJumpstart from './ShipperJumpstart';


function ShipperDashboard() {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <ShipperJumpstart />
                <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto mt-[0.3rem] ">
                <div class="block box-border h-auto w-1/3">
                       
                    </div>

                    <div class="block box-border h-auto w-1/3">
                       

                    <div class="block box-border h-auto w-1/3">
                      
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        
                    </div>

                    <div class="block box-border h-auto w-1/3">
                        
                    </div>

                </div>
                </div>
            </Suspense>
        </>
    )
}

export default ShipperDashboard;
