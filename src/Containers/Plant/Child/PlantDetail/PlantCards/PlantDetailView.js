import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";

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
   
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px", textOverflow: "ellipsis" }}>
        {value}
      </SubTitle>
    </div>
  );
};
