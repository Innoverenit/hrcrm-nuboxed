import React, { Component } from "react";
import { MultiAvatar } from "../../../../../Components/UI/Elements";

class PlantOverView extends Component {
  render() {
    const {
      plant: { name },
      toggleViewType,
    } = this.props;

    return (
      <>
        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
        <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[70%]">
            <div style={{ width: "25%" }}>
              <MultiAvatar />
            </div>
            &nbsp;
            <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[70%] ">
              <div overflow="hidden" textOverflow="ellipsis">
                {` ${name || ""} `}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PlantOverView;
