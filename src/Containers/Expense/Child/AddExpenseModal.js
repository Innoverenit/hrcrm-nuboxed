import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ExpenseForm=lazy(()=> import("./ExpenseForm"));

const AddExpenseModal = (props) => {
  const { addExpenseModal, handleExpenseModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.addVoucher"
          defaultMessage="Add Voucher"
        />}
        width={drawerWidth}
        visible={addExpenseModal}
        onClose={() => handleExpenseModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ExpenseForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddExpenseModal;
