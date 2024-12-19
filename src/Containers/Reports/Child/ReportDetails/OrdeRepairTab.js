
import React, {  useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Avatar } from "antd";
import OrderRepairCard from './OrderRepairCard';
import OrderRepairCompletedCard from './OrderRepairCompletedCard';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ShopIcon from '@mui/icons-material/Shop'
import OrderProcureCard from './OrderProcureCard';
import OrderProductionCard from './OrderProductionCard';
import OrderRepairLocationCard from './OrderRepairLocationCard';

function OrdeRepairTab (props) {

  const [selectedButtonIcon, setSelectedButtonIcon] = useState("");
    const [clickedTab,setClickedTab]= useState("open");

    return (
      <>
<div class="flex mt-4">
<div class=" flex items-center" >
{props.selectedCategory === "Orders" && props.reportViewType === "ME" && (
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
{selectedButtonIcon === "Procure" && (
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
{selectedButtonIcon === "production" && (
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

{props.selectedCategory === "Orders" && selectedButtonIcon === "repair" && clickedTab === "open" ? (
      <OrderRepairCard               
      selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
      />
) : props.selectedCategory === "Orders" && selectedButtonIcon === "repair" && clickedTab === "complete" ?
<OrderRepairCompletedCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}/>
: props.selectedCategory === "Orders" && selectedButtonIcon === "repair" && clickedTab === "bylocation" ?
<OrderRepairLocationCard 
selectedButtonIcon={props.selectedButtonIcon}
selectedCategory={props.selectedCategory}
translateText={props.translateText}
selectedLanguage={props.selectedLanguage}
/>
:null
}

{selectedButtonIcon === "Procure" && clickedTab === "open" ? (
        <OrderProcureCard
        selectedButtonIcon={props.selectedButtonIcon}
        selectedCategory={props.selectedCategory}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        />
) : selectedButtonIcon === "Procure" && clickedTab === "complete" ?
<h2>Procure complete</h2>
: selectedButtonIcon === "Procure" && clickedTab === "bylocation" ?
<h2>By location</h2>
:null
}
{selectedButtonIcon === "production" && clickedTab === "open" ? (
         <OrderProductionCard
         selectedButtonIcon={props.selectedButtonIcon}
         selectedCategory={props.selectedCategory}
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
         />
) : selectedButtonIcon === "production" && clickedTab === "complete" ?
<h2>Production complete</h2>
: selectedButtonIcon === "production" && clickedTab === "bylocation" ?
<h2>By location</h2>
:null
}
       </>
    )
}

const mapStateToProps = ({ report, auth }) => ({
  reportViewType: report.reportViewType,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrdeRepairTab);
