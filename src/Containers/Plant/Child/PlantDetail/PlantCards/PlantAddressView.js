import React, { Component } from "react";

class PlantAddressView extends Component {
  render() {
    const {
      plant: { addresses },
    } = this.props;
    return (
      <>
        <PlantItemRow label="Street" value={addresses && addresses[0].street} />
        <PlantItemRow label="City" value={addresses && addresses[0].city} />
        <PlantItemRow label="State" value={addresses && addresses[0].state} />
        <PlantItemRow
          label="Pincode"
          value={addresses && addresses[0].pinCode}
        />
        <PlantItemRow
          label="Country"
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default PlantAddressView;

const PlantItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem]">
   
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">
        {value}
      </div>
    </div>
  );
};
