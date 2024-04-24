import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const CampaignForm = lazy(() => import("./CampaignForm"));

const CampaignDrawer = (props) => {
  const {customer, ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage id="app.campaign" defaultMessage="Campaign" />}
        width="60%"
        visible={props.openCampaigndrwr}
        destroyOnClose
        closable
        onClose={() => props.handleCampaignDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CampaignForm customer={customer}{...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CampaignDrawer;
