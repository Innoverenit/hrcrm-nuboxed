import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../Components/Placeholder';
import CloseIcon from '@mui/icons-material/Close';
const AddMultipleQCSpare = lazy(() => import("./AddMultipleQCSpare"));
const RepairSpareListTable = lazy(() => import("./RepairSpareListTable"));

const AddSpareInRepair = (props) => {
    console.log(props.newData && props.newData.phoneTaskId)
    return (
       
        <>
        <div class="w-wk flex justify-end">
         <CloseIcon className='!text-icon cursor-pointer' onClick={props.onClose}/>
         </div>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex flex-col">
                    <div class="w-[70%]">
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