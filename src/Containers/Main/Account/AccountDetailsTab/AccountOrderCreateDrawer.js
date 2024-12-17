import React, { Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AccountOpportunityStepper from "./AccountOpportunityStepper";

const AccountOrderCreateDrawer = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={`${props.title}`}
        width="60%"
        visible={props.isModalOpen}
        onClose={props.setIsModalOpen}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountOpportunityStepper 
          currentOrderType={props.currentOrderType}
         isModalOpen={props.isModalOpen}
         setIsModalOpen={props.setIsModalOpen}
         type={props.type}
         distributorId={props.distributorId}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AccountOrderCreateDrawer;
