import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateExpenseForm = lazy(() => import("../UpdateExpense/UpdateExpenseForm"));

const UpdateExpenseModal = (props) => {
  return (
    <>
      <StyledDrawer
        //title="Update Customer"

        title={<FormattedMessage
          id="app.updatecustomer"
          defaultMessage="Update Expense"
        />}
        width="60vw"
        // height="14vw"
        visible={props.updateExpenseModal}
        onClose={() => props.handleUpdateExpenseModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateExpenseForm  />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateExpenseModal;
