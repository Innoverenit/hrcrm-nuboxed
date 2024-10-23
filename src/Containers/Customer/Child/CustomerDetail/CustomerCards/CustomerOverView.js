import React, { Component } from "react";
import {  MultiAvatar } from "../../../../../Components/UI/Elements";

class CustomerOverView extends Component {
  render() {
    const {
      customer: { name },
      toggleViewType,
      customer,
    } = this.props;

    return (
      <>
        <div class=" flex justify-between">
          <div class=" flex justify-start flex-nowrap w-wk items-center"
          >
            <div class=" w-[15%] mr-1" >
              <MultiAvatar
                primaryTitle={customer.name}
                imageId={customer.imageId}
                imageURL={customer.imageURL}
              />
            </div>
            <div class=" flex flex-col w-wk">
            <div class=" w-wk text-[#444] overflow-hidden text-lg textOverflow-ellipsis">
  
                {`${name || ""}`}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CustomerOverView;
