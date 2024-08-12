import React from 'react'
import { ActionIcon } from "../../../Components/Utils";
import { FormattedMessage } from "react-intl";
import PlannerShareForm from "./PlannerShareForm"
const PlannerActionLeft = (props) => {
    return (
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
            <ActionIcon
                style={{ marginRight: '0.3rem', color: props.viewType === 'table' && '#1890ff' }}
                iconType='appstore-o'
                // tooltipTitle='Back'
                tooltipTitle={
                    <FormattedMessage
                      id="app.back"
                      defaultMessage="Back"
                    />
                  }
               
                handleIconClick={() => props.setPlannerViewType('table')}
            />        
            {props.viewType==="dashboard"?
            <PlannerShareForm/>
            :null}
        </div>
    )
}

export default PlannerActionLeft 