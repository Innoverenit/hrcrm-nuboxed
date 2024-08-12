import React, { Component } from "react";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";

class InventoryOverView extends Component {
  render() {
    const {
      inventory: { locationName },
      toggleViewType,
    } = this.props;
    // const inventoryName = `${salutation || ""} ${firstName || ""} ${middleName ||
    //   ""} ${lastName || ""} `;
    return (
      <>
     <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
     <div class=" flex flex-row flex-wrap flex-start items-start self-start justify-start grow shrink h-auto mr-auto w-[70%]">
         
            <div style={{ width: "25%" }}>
              <MultiAvatar />
            </div>
            &nbsp;
            <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[70%]">
              <Title overflow="hidden" textOverflow="ellipsis">
                {` ${locationName || ""} `}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default InventoryOverView;
