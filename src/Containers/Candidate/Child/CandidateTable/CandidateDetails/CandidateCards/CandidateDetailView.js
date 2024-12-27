import React, { Component } from "react";

import dayjs from "dayjs";
import { Tooltip } from "antd";

class CandidateDetailView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { tag_with_company, mobileNumber, department, designation
        ,dateOfBirth,availableDate,emailId ,idNumber,gender,nationality,linkedin,idProof},
    } = this.props;
    return (
      <>     
      <CandidateItemRow 
         label={this.props.translatedMenuItems[6]}
          value={this.props.candidate.availableDate === null ? "None" :
          <>    
          {dayjs(availableDate).format("ll")}
          </>
          }
           />
  
        <CandidateItemRow 
          label={this.props.translatedMenuItems[7]}  
          value={tag_with_company } />
       
            
           <CandidateItemRow 
         label={this.props.translatedMenuItems[8]}   
          value={designation
          } />
           
           <CandidateItemRow //label="Mobile Number" 
         label={this.props.translatedMenuItems[9]}  
          value={`${idProof || ""} ${idNumber || ""}`}/>

          
            <CandidateItemRow //label="Mobile Number" 
           label={this.props.translatedMenuItems[10]}  
           value={gender} />                         
      </>
    );
  }
}
export default CandidateDetailView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center  justify-between flex-nowrap m-2"
    >
       <div className="text-[#444] font-semibold text-sm"  >{label}</div >
       <div className="-ml-6 hidden ellipsis">{value}
        <Tooltip title={value}>
        {value}
        </Tooltip>
        </div >
    </div>
  );
};
