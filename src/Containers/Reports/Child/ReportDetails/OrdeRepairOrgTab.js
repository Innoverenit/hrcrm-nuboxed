import React, {  useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Avatar } from "antd";
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ShopIcon from '@mui/icons-material/Shop';

import OrderRepairOrgCard from './OrderRepairOrgCard';
import OrderRepairCompletedOrgCard from './OrderRepairCompletedOrgCard';
import OrderRepairLocationOrgCard from './OrderRepairLocationOrgCard';


function OrdeRepairOrgTab (props) {

  const [selectedButtonIcon, setSelectedButtonIcon] = useState("");
    const [clickedTab,setClickedTab]= useState("open");

    return (
      <>
<div class="flex mt-4">
<div class=" flex items-center" >
{props.selectedCategory === "Orders" && props.reportViewType === "ALL" && (
  <>
<span class="cursor-pointer mr-1"
                    onClick={() => setSelectedButtonIcon("repair")}
                    style={{
                      color: selectedButtonIcon === "repair" && "tomato",
                    }}
                  >
                    <Tooltip title="Repair">
                      <Avatar style={{ background: selectedButtonIcon === "repair" ? "#f279ab" : "#28a355" }}>
                      <OnDeviceTrainingIcon  className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>
                  </span>

<span class="cursor-pointer mr-1"
onClick={() => setSelectedButtonIcon("Procure")}
style={{
  color: selectedButtonIcon === "Procure" && "tomato",
}}
>
<Tooltip title="Procure">
  <Avatar style={{ background: selectedButtonIcon === "Procure" ? "#f279ab" : "#28a355" }}>
    <ShopIcon className="text-white !text-icon" />
  </Avatar>
</Tooltip>
</span>
<span class="cursor-pointer mr-1"
onClick={() => setSelectedButtonIcon("production")}
style={{
  color: selectedButtonIcon === "production" && "tomato",
}}
>
<Tooltip title="Production">
  <Avatar style={{ background: selectedButtonIcon === "production" ? "#f279ab" : "#28a355" }}>
    <DynamicFeedIcon className="text-white !text-icon" />
  </Avatar>
</Tooltip>
</span>
</>              
)}
</div>
{selectedButtonIcon === "repair" && (
    <div class=" flex items-center bg-[peachpuff] border rounded-md p-[0.3rem]" >
         <span 
        onClick={() => setClickedTab("open")} 
        style={{
          color:clickedTab === "open" && "fuchsia",
          cursor:"pointer"
        }}
        >
        Open
        </span>
      
&nbsp;&nbsp;
        <span 
        onClick={() => setClickedTab("complete")} 
        style={{
          color:clickedTab === "complete" && "fuchsia",
          cursor:"pointer"
        }}
        >
          Complete
        </span>
      
        &nbsp;&nbsp;
        <span 
        onClick={() => setClickedTab("bylocation")} 
        style={{
          color:clickedTab === "bylocation" && "fuchsia",
          cursor:"pointer"
        }}
        >
          By Location
        </span>

    </div>
)}
    </div>

{props.selectedCategory === "Orders" && selectedButtonIcon === "repair" &&  clickedTab === "open" ? (
      <OrderRepairOrgCard               
      selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      />
) :props.selectedCategory === "Orders" && selectedButtonIcon === "repair" &&  clickedTab === "complete" ?
<OrderRepairCompletedOrgCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}/>
: props.selectedCategory === "Orders" && selectedButtonIcon === "repair" && props.selectedCategory === "Orders" && selectedButtonIcon === "repair" && clickedTab === "bylocation" ?
<OrderRepairLocationOrgCard 
selectedButtonIcon={props.selectedButtonIcon}
selectedCategory={props.selectedCategory}
/>
:null
}
       </>
    )
}

const mapStateToProps = ({ report}) => ({
  reportViewType: report.reportViewType,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrdeRepairOrgTab);
