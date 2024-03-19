import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
 const PitchOpportunityForm =lazy(()=>import("./PitchOpportunityForm"));

const AddPitchOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={
          <FormattedMessage id="app.quotation" defaultMessage="Quotation" />
        }
        width="60%"
        visible={props.addPitchOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handlePitchOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <PitchOpportunityForm 
         investorleadsId={props.pitch.investorLeadsId}
          />{" "}
       
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddPitchOpportunityModal;
