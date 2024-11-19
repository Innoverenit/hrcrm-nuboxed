import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import InvestorDealForm from "./InvestorDealForm"

const CreateInvestorDealModal = (props) => {
  const {opencreateDealModal,handleDealModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Deal"
      
        width={drawerWidth}
        visible={opencreateDealModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleDealModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <InvestorDealForm
       investorDetails={props.investorDetails}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}

          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CreateInvestorDealModal;
