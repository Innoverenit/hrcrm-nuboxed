import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const DealAddedTable =lazy(()=>import("./DealAddedTable"));

const DealsAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
  title={<FormattedMessage
    id="app.dealsAdded"
    defaultMessage="Deals Added"
  />}
        width="60%"
        visible={props.openDealAdded}
        onClose={()  => props.handleDealAddedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <DealAddedTable
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
         translatedMenuItems={this.props.translatedMenuItems}
        />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default DealsAddedDrawer;




  
