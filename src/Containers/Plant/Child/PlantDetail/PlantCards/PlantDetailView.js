import React, { Component } from "react";

class PlantDetailView extends Component {
  render() {
    const {
      plant: { management, productionManager },
    } = this.props;
    return (
      <>
        <PlantItemRow label="Management" value={management} />
        <PlantItemRow label="Production Manager" value={productionManager} />
      </>
    );
  }
}
export default PlantDetailView;

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
