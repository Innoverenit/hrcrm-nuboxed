import React from 'react'
import AddQuotationRepairExcel from './AddQuotationRepairExcel';

const AccountRepairSecondStep = (props) => {

    return (
        <>
            <div>
                <AddQuotationRepairExcel distributorId={props.distributorId} 
                handleAccountOpportunityModal={props.handleAccountOpportunityModal}/>
            </div>

        </>
    )
}
export default AccountRepairSecondStep;
