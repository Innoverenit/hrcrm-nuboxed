import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../Components/Placeholder';
const AddMultipleQCSpare = lazy(() => import("./AddMultipleQCSpare"));
const RepairSpareListTable = lazy(() => import("./RepairSpareListTable"));

const AddSpareInRepair = (props) => {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex flex-col">
                    <div class="w-[50%]">
                        <AddMultipleQCSpare RowData={props.RowData} />
                    </div>
                    <div class="w-wk">
                        <RepairSpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                            orderPhoneId={props.orderPhoneId}
                        />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddSpareInRepair