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
          label="Availability"
        

          value={this.props.candidate.availableDate === null ? "None" :
          <>
          
          {dayjs(availableDate).format("ll")}
          </>
          }
           />
  
        <CandidateItemRow 
        label="Company" 
          
          value={tag_with_company } />
       
            
           <CandidateItemRow 
          label="Designation"
       
          value={designation
          } />
           
           <CandidateItemRow //label="Mobile Number" 
          label="Identification"
         
         
          value={`${idProof || ""} ${idNumber || ""}`}/>

          
            <CandidateItemRow //label="Mobile Number" 
          label="Gender"
         
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
      <div  style={{ color: "#444", fontWeight: 600 }}>{label}</div >
      <div  style={{ marginLeft: "-1.875em" ,overflow:"hidden",textOverflow:"ellipsis"}}>
        <Tooltip title={value}>
        {value}
        </Tooltip>
        </div >
    </div>
  );
};
