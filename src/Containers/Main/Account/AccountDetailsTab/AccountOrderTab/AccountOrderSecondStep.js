import React, { lazy, Suspense} from 'react'
import { BundleLoader } from '../../../../../Components/Placeholder';
const AddPhoneExcel = lazy(() => import('./AddPhoneExcel'));
const AccountOrderSecondStep = (props) => {

    return (
        <>
            <div>
                <Suspense fallback={<BundleLoader />}>
                <AddPhoneExcel distributorId={props.distributorId}  setIsModalOpen={props.setIsModalOpen}/>
                </Suspense>
            </div>

        </>
    )
}
export default AccountOrderSecondStep
