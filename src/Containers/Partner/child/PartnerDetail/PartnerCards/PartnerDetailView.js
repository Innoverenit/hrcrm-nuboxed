import React, { Component } from "react";

class PartnerDetailView extends Component {
  render() {
    console.log(this.props.partner);
    const {
      partner: { url, phoneNo, sector,status,address },
    } = this.props;
    console.log(address)
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    const statusdata=status?"True":"False"
    return (
      <>
        <PartnerItemRow label="URL" value={url} />
        <PartnerItemRow label="Phone Number" value={phoneNo} />
        <PartnerItemRow label="Sector" value={sector} />
        <PartnerItemRow label="Status" value={statusdata} />
        <PartnerItemRow label="Address" value={addressdata||""} />
        <PartnerItemRow label="Street" value={addressdata1||""} />
        <PartnerItemRow label="City" value={addressdata2||""} />
        <PartnerItemRow label="State" value={addressdata3||""} />
        <PartnerItemRow label="Postal Code" value={addressdata4||""} />
      </>
    );
  }
}
export default PartnerDetailView;

const PartnerItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-nowrap m-1"
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{value}</div>
    </div>
  );
};
