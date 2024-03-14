import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const CampaignForm = lazy(() => import("./CampaignForm"));

const CampaignDrawer = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage id="app.campaign" defaultMessage="Campaign" />}
        width="60%"
        visible={props.openCampaigndrwr}
        onClose={() => props.handleCampaignDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CampaignForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CampaignDrawer;
