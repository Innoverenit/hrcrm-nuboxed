import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { SubTitle } from "../../../../../Components/UI/Elements";

class DealRecruiterDetails extends Component {
  render() {
    console.log(this.props.dealDetailsbyID);
    const {
      dealDetailsbyID: { recruiterDetails,assignedTo },
} = this.props;
  
   
    return (
      <>
        <DealItemRow     label={<FormattedMessage
                id="app.assignedto"
                defaultMessage="Assigned"
              />}
        value={assignedTo} 
        />
         
      </>
    );
  }
}
export default DealRecruiterDetails;

const DealItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[92%] justify-between flex-no-wrap m-2 h-2">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate ml-8">{value}</div>
    </div>
  );
};
