import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import DistributorTicketForm from "./DistributorTicketForm"
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
//import AccountOpportunityStepper from "./AccountOpportunityStepper";

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
        <DistributorTicketForm/>
          {/* <AccountOpportunityStepper {...formProps} />{" "} */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddDistributorTicketModal;
