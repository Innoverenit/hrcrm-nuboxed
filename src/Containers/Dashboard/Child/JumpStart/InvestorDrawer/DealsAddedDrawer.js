import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const DealAddedTable =lazy(()=>import("./DealAddedTable"));

const DealsAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
  title="Deals Added"
  
        width="60%"
        visible={props.openDealAdded}
        onClose={()  => props.handleDealAddedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <DealAddedTable
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
        />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default DealsAddedDrawer;




  
