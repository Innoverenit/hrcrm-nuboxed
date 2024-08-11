import React, { lazy, Suspense } from 'react'
const AddMultipleSpare = lazy(() => import("./AddMultipleSpare"));
const SpareListTable = lazy(() => import('./SpareListTable'));

const AddingSpareList = (props) => {
    return (
        <>
            <Suspense fallback={"Loading"}>
                <div class="flex justify-between">
                    <div class="w-[47%]">
                    <Suspense fallback={<BundleLoader />}>
                        <AddMultipleSpare RowData={props.RowData} />
                        </Suspense>
                    </div>
                    <div class="w-[50%]">
                    <Suspense fallback={<BundleLoader />}>
                        <SpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                        />
                        </Suspense>
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddingSpareList