import React, { useEffect, useState, useMemo, lazy } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Icon, Button, Input, Popconfirm, Modal,Badge } from "antd";
import styled from 'styled-components';
import InvoiceUserCompleteCard from './InvoiceUserCompleteCard';
import InvoiceUserInCompleteCard from './InvoiceUserInCompleteCard';
import InvoiceUserAllCard from './InvoiceUserAllCard';


function InvoiceReportUserTab (props) {

    const [clickedTab,setClickedTab]= useState("open");

    return (
      <>
<div class="flex mt-4">
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
        onClick={() => setClickedTab("all")} 
        style={{
          color:clickedTab === "all" && "fuchsia",
          cursor:"pointer"
        }}
        >
          ALL
        </span>
    </div>

    </div>

{clickedTab === "open" ? (
      <InvoiceUserInCompleteCard               
      selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      />
) : clickedTab === "complete" ?
<InvoiceUserCompleteCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}/>
: clickedTab === "all" ?
<InvoiceUserAllCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}/> 
      :null
}
       </>
    )
}

const mapStateToProps = ({ myorder, auth, setting, requirement }) => ({

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReportUserTab);
