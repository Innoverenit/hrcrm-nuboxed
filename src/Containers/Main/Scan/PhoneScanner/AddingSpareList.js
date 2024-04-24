import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../../Components/Placeholder';
const AddSpareForm = lazy(() => import("./AddSpareForm"));
const SpareListTable = lazy(() => import("./SpareListTable"));

const AddingSpareList = (props) => {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex justify-between max-sm:flex-col">
                    <div class="w-[30%] max-sm:w-auto">
                        <AddSpareForm phoneDetails={props.phoneDetails} />
                    </div>
                    <div class="w-[65%] max-sm:w-auto">
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