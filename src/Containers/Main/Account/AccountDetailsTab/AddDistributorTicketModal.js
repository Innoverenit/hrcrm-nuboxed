import React, {  Suspense } from "react";
import DistributorTicketForm from "./DistributorTicketForm"
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const AddDistributorTicketModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
       title="Ticket"
        width="75%"
        visible={props.addSupplierTicketModal}
        onClose={() => props.handleSupplierTicketModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <DistributorTicketForm
        distributorData={props.distributorData}
        />
          {/* <AccountOpportunityStepper {...formProps} />{" "} */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddDistributorTicketModal;
