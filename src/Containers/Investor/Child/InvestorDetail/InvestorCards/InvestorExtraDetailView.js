import React, {  } from "react";


function InvestorExtraDetailView (props) {
    const {
        investorDetails: {
        url,
        phoneNumber,
        vatNo,
        countryDialCode,
        sector,
        source,
        businessRegistration,
        address,
      },
    } = props;

    return (
      <>
        <InvestorItemRow 
        label="URL"
       
          value={url}
        />
        <InvestorItemRow
          label="Phone #"
          value={`${countryDialCode || ""} ${phoneNumber || ""}`}
        />

        <InvestorItemRow //label="Phone Number"
          label="Registration #"
          value={vatNo}
        />

        <InvestorItemRow //label="Phone Number"
          label= "Tax Registration #"

          value={businessRegistration}
        />

        <InvestorItemRow //label="Phone Number"
          label="Sector"
          value={sector}
        />
         <InvestorItemRow //label="Phone Number"
          label="Source"
          value={source}
        />
      </>
    );
  
}
export default InvestorExtraDetailView;

const InvestorItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
       <div class=" #1c1b1b font-semibold" >{label}</div>
       <div className="overflow-hidden truncate ml-8">
       {value}
      </div>
    </div>
  );
};
