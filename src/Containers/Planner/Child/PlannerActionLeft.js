import React from 'react'
import BorderColorIcon from "@mui/icons-material/BorderColor";

import PlannerShareForm from "./PlannerShareForm"
const PlannerActionLeft = (props) => {
    return (
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
            <BorderColorIcon
                className=" !text-red-600 cursor-pointer !text-icon "
                iconType='appstore-o'
                tooltipTitle='Back'
               
                handleIconClick={() => props.setPlannerViewType('table')}
            />        
            {props.viewType==="dashboard"?
            <PlannerShareForm/>
            :null}
        </div>
    )
}

export default PlannerActionLeft 