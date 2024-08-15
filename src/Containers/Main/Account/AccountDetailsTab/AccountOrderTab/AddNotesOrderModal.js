import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from 'react-intl';


const AddNotesOrderModal = (props) => {
  const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.notes"
          defaultMessage="Notes"
         />}
        width="60%"
        visible={props.addNotesInOrder}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handleNotesModalInOrder(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddNotesOrderModal;

