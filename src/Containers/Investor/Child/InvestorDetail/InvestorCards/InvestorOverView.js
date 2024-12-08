import React, { } from "react";
import {  MultiAvatar } from "../../../../../Components/UI/Elements";

function InvestorOverView (props) {

    const {
        investorDetails: { name },
      toggleViewType,
      investorDetails,
    } = props;

    return (
      <>
        <div class=" flex justify-between">
          <div class=" flex justify-start flex-nowrap w-4/6"
          >
            <div class=" w-1/3" >
              <MultiAvatar
                primaryTitle={investorDetails.name}
                imageId={investorDetails.imageId}
                imageURL={investorDetails.imageURL}
              />
            </div>
            <div class=" flex flex-col w-wk  text-sm overflow-hidden text-ellipsis text-black items-center ">
              
                {`${name || ""}`}
              
            </div>
          </div>
        </div>
      </>
    );
}
export default InvestorOverView;
