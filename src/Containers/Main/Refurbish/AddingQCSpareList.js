import { Suspense, lazy } from 'react';
import { BundleLoader } from '../../../Components/Placeholder';
const QCSpareListTable = lazy(() => import("./QCSpareListTable"));

const AddingQCSpareList = (props) => {
    return (
        <>
            <Suspense fallback={<BundleLoader />}>
                <div class="flex flex-col">
                  
                    <div class="w-wk">
                        <QCSpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                        />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddingQCSpareList