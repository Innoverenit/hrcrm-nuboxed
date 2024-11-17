import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const CampaignForm = lazy(() => import("./CampaignForm"));

const CampaignDrawer = (props) => {
  const {customer, ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Campaign"
        width="60%"
        visible={props.openCampaigndrwr}
        destroyOnClose
        closable
        onClose={() => props.handleCampaignDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CampaignForm customer={customer}{...formProps} 
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CampaignDrawer;
