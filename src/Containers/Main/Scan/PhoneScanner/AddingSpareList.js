import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../../Components/Placeholder';
const AddSpareForm = lazy(() => import("./AddSpareForm"));
const SpareListTable = lazy(() => import("./SpareListTable"));

const AddingSpareList = (props) => {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex justify-between">
                    <div class="w-[30%]">
                        <AddSpareForm phoneDetails={props.phoneDetails} />
                    </div>
                    <div class="w-[65%]">
                        <SpareListTable
                            phoneId={props.phoneId}
                            phoneDetails={props.phoneDetails}
                        />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddingSpareList