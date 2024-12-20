import React, {  useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvoiceOrgCompleteCard from './InvoiceOrgCompleteCard';
import InvoiceOrgInCompleteCard from './InvoiceOrgInCompleteCard';
import InvoiceOrgAllCard from './InvoiceOrgAllCard';


function InvoiceReportOrgTab (props) {

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
      <InvoiceOrgInCompleteCard               
      selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      translateText={props.translateText}
   selectedLanguage={props.selectedLanguage}
      />
) : clickedTab === "complete" ?
<InvoiceOrgCompleteCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      translateText={props.translateText}
   selectedLanguage={props.selectedLanguage}/>
: clickedTab === "all" ?
<InvoiceOrgAllCard selectedButtonIcon={props.selectedButtonIcon}
      selectedCategory={props.selectedCategory}
      translateText={props.translateText}
   selectedLanguage={props.selectedLanguage}/> 
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReportOrgTab);
