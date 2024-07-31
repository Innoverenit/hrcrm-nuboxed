import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { FormattedMessage } from 'react-intl';
import LeadsSubscriptionForm from "../../Child/LeadsTable/LeadsSubscriptionForm"

//const OrderNotesForm = lazy(() => import("./OrderNotesForm"));

const AddSubscriptionModal = (props) => {
  const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.notes"
          defaultMessage="Notes"
         />}
        width="60%"
        visible={props.addDrawerLeadsSubscriptionModal}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handleLeadsSubscriptionModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
       <LeadsSubscriptionForm/>
          {/* <OrderNotesForm particularRowData={particularRowData} /> */}
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddSubscriptionModal;

