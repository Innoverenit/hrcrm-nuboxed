import React from 'react'
import AddProcureExcel from './AddProcureExcel'

const AccountProcureSecondStep = (props) => {

    return (
        <>
            <div>
                <AddProcureExcel 
                distributorId={props.distributorId}
                translatedMenuItems={props.translatedMenuItems}
                />
            </div>

        </>
    )
}
export default AccountProcureSecondStep
