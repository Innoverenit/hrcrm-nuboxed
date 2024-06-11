import React from 'react'
import AddQuotationRepairExcel from './AddQuotationRepairExcel';

const AccountRepairSecondStep = (props) => {

    return (
        <>
            <div>
                <AddQuotationRepairExcel distributorId={props.distributorId} />
            </div>

        </>
    )
}
export default AccountRepairSecondStep;
