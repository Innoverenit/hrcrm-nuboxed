import React, { Component } from "react";
import { Tooltip} from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
class PartnerBankDetails extends Component {
  render() {
    console.log(this.props.partner);
    const {
      partner: { businessRegistrationNumber, bankName, taxRegistrationNumber, accountNumber },user
    } = this.props;
    return (
      <>
        <div class=" flex justify-end">
            <Tooltip title="Edit">
              <BorderColorIcon
                iconType="edit"
                onClick={this.props.toggleViewType}
             style={{fontSize:"1rem"}}
              />
           
            </Tooltip>
             
        </div>
        <PartnerItemRow label="Bussiness Reg. No." value={businessRegistrationNumber} />
        <PartnerItemRow label= "Tax Reg. No." value={taxRegistrationNumber}/>
        <PartnerItemRow label="Bank Name" value={bankName} />
        <PartnerItemRow label="Account No." value={accountNumber}/>
      </>
    );
  }
}
export default PartnerBankDetails;

const PartnerItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap"
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{value}</div>
    </div>
  );
};
