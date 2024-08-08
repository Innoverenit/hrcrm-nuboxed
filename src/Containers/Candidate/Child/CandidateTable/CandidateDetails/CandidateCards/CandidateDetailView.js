import React, { Component } from "react";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
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
      <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.availability"
            defaultMessage="Availability"
          />}

          value={this.props.candidate.availableDate === null ? "None" :
          <>
          
          {dayjs(availableDate).format("ll")}
          </>
          }
           />
  
        <CandidateItemRow //label="Company" 
          label={<FormattedMessage
            id="app.company"
            defaultMessage="Company"
          />}
          value={tag_with_company } />
       
            {/* <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />}
          value={department} /> */}
           <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation
          } />
           
           <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.identification"
            defaultMessage="Identification"
          />}
         
          value={`${idProof || ""} ${idNumber || ""}`}/>

          
           {/* <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.dateOfBirth"
            defaultMessage="Date of Birth"
          />}
           value={dateOfBirth} /> */}
            <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.gender"
            defaultMessage="Gender"
          />}
           value={gender} />
            

           
           
      </>
    );
  }
}
export default CandidateDetailView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-nowrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em" ,overflow:"hidden",textOverflow:"ellipsis"}}>
        <Tooltip title={value}>
        {value}
        </Tooltip>
        </SubTitle>
    </div>
  );
};
