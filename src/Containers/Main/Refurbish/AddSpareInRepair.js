import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../Components/Placeholder';

const AddMultipleQCSpare = lazy(() => import("./AddMultipleQCSpare"));
const RepairSpareListTable = lazy(() => import("./RepairSpareListTable"));

const AddSpareInRepair = (props) => {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex justify-between">
                    <div class="w-[30%]">
                        <AddMultipleQCSpare RowData={props.RowData} />
                    </div>
                    <div class="w-[65%]">
                        <RepairSpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                        />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddSpareInRepair