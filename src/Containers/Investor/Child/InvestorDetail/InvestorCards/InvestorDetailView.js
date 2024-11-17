import React, {  } from "react";


function InvestorDetailView (props) {   
    const {
        investorDetails: { url, phoneNumber,address },
    } = props;

    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
        

<InvestorItemRow label={<FormattedMessage
                  id="app.address"
                  defaultMessage="Address"
                />} value={addressdata||""} />
        <InvestorItemRow label={<FormattedMessage
          id="app.street"
          defaultMessage="Street"
        />} value={addressdata1||""} />
        <InvestorItemRow label={<FormattedMessage
            id="app.city"
            defaultMessage="City"
          />} value={addressdata2||""} />
        <InvestorItemRow  label={<FormattedMessage
              id="app.state"
              defaultMessage="State"
            />} value={addressdata3||""} />
        <InvestorItemRow label={<FormattedMessage
            id="app.pincode"
            defaultMessage="Pin Code"
          />} value={addressdata4||""} />
      </>
    );
}
export default InvestorDetailView;

const InvestorItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate ml-8">{value}</div>
    </div>
  );
};