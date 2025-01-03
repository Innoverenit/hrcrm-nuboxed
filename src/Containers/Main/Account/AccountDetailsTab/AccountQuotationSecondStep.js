import React from "react";
import AddQuotationRepairExcel from "./AddQuotationRepairExcel";
const AccountQuotationSecondStep = (props) => {
  return (
    <>
      <div>
        <AddQuotationRepairExcel
          distributorId={props.distributorId}
          handleAccountOpportunityModal={props.handleAccountOpportunityModal}
          setIsModalOpen={props.setIsModalOpen}
          translatedMenuItems={props.translatedMenuItems}
        />
      </div>
    </>
  );
};
export default AccountQuotationSecondStep;
