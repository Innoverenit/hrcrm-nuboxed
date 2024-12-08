import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import NewArrivalContactList from "./NewArrivalContactList";
import NewEmailContactList from "./NewEmailContactList";





const ContactListOfEmailList = (props) => {
  const { contacrOpen, handleContactOpen, RowData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        // title={`Share Own ${props.RowData.}`}
        title="Contact List"
        width={drawerWidth}
        visible={contacrOpen}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleContactOpen(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <NewEmailContactList
          RowData={RowData}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ContactListOfEmailList;
