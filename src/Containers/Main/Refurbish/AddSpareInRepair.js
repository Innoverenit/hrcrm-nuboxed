import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../Components/Placeholder';
const AddMultipleQCSpare = lazy(() => import("./AddMultipleQCSpare"));
const RepairSpareListTable = lazy(() => import("./RepairSpareListTable"));

const AddSpareInRepair = (props) => {
    console.log(props.newData && props.newData.phoneTaskId)
    return (
       
        <>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex flex-col">
                    <div class="w-[50%]">
                        <AddMultipleQCSpare RowData={props.RowData} phoneTaskId={props.newData && props.newData.phoneTaskId}   />
                    </div>
                    <div class="w-wk">
                        <RepairSpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                           // orderPhoneId={props.orderPhoneId}  
                            phoneTaskId={props.newData && props.newData.phoneTaskId}                               
                        />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddSpareInRepair