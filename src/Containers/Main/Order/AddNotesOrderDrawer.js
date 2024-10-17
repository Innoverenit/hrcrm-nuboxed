import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



const AddNotesOrderDrawer = (props) => {
  const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Notes`}
        width="70%"
        visible={props.addNotesInOrder}
        // maskClosable={false}
        destroyOnClose
        onClose={() => props.handleNotesModalInOrder(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <OrderNotesForm particularRowData={particularRowData} /> */}
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddNotesOrderDrawer;

