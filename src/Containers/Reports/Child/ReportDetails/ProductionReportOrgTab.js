import React, { useEffect, useState, useMemo, lazy } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Icon, Button, Input, Popconfirm, Modal,Badge,Avatar } from "antd";
import styled from 'styled-components';
import ProductionLocationOrgCard from './ProductionLocationOrgCard';
import InvoiceOrgInCompleteCard from './InvoiceOrgInCompleteCard';
import InvoiceOrgAllCard from './InvoiceOrgAllCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewInArIcon from '@mui/icons-material/ViewInAr';


function ProductionReportOrgTab (props) {

  const [selectedButtonIcon, setSelectedButtonIcon] = useState("");
    const [clickedTab,setClickedTab]= useState("");

    return (
      <>
<div class="flex mt-4">
<div class=" flex items-center" >
{props.selectedCategory === "Production" && props.reportViewType === "ALL" && (
  <>
<span class="cursor-pointer mr-1"
                    onClick={() => setSelectedButtonIcon("location")}
                    style={{
                      color: selectedButtonIcon === "location" && "tomato",
                    }}
                  >
                    <Tooltip title="Location">
                      <Avatar style={{ background: selectedButtonIcon === "location" ? "#f279ab" : "#28a355" }}>
                        <LocationOnIcon className="text-white !text-icon" />
                      </Avatar>
                    </Tooltip>
                  </span>

<span class="cursor-pointer mr-1"
onClick={() => setSelectedButtonIcon("catalogue")}
style={{
  color: selectedButtonIcon === "catalogue" && "tomato",
}}
>
<Tooltip title="Catalogue">
  <Avatar style={{ background: selectedButtonIcon === "catalogue" ? "#f279ab" : "#28a355" }}>
    <ViewInArIcon className="text-white !text-icon" />
  </Avatar>
</Tooltip>
</span>

</>              
)}

</div>
{selectedButtonIcon === "location" && (
  <>
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
      
        {/* &nbsp;&nbsp;
        <span 
        onClick={() => setClickedTab("all")} 
        style={{
          color:clickedTab === "all" && "fuchsia",
          cursor:"pointer"
        }}
        >
          ALL
        </span> */}
    </div>
    </>
  )}
  {selectedButtonIcon === "catalogue" && (
  <>
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
      
        {/* &nbsp;&nbsp;
        <span 
        onClick={() => setClickedTab("all")} 
        style={{
          color:clickedTab === "all" && "fuchsia",
          cursor:"pointer"
        }}
        >
          ALL
        </span> */}
    </div>
    </>
  )}
    </div>

{selectedButtonIcon === "location" && clickedTab === "open" && (
      <ProductionLocationOrgCard               
      selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      /> 
)}
{selectedButtonIcon === "catalogue" && clickedTab === "open" && (
 <h2>Hii Cata</h2>
)}
{/* clickedTab === "complete" ?
<InvoiceOrgCompleteCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}/>
      <h2>h2</h2>
: clickedTab === "all" ?
<InvoiceOrgAllCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}/>  */}
     


       </>
    )
}

const mapStateToProps = ({ report, auth}) => ({
  reportViewType: report.reportViewType,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionReportOrgTab);
