import React from 'react'
import {Tooltip } from "antd";

import TocIcon from '@mui/icons-material/Toc';

const CallActionLeft = (props) => {
    return (
        <div class=" flex items-center" >
               <Tooltip
        title="calls">
        <span class=" mr-2 cursor-pointer text-xs"
          onClick={() => props.setCallViewType("table")}
          style={{
            color: props.viewType === "table" && "#1890ff",
            cursor:"pointer"
          }}
        > <TocIcon  />
        
        </span>
      </Tooltip>
           
        </div>
    )
}

export default CallActionLeft 