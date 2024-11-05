import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import NewArrivalContactList from "./NewArrivalContactList";





const ContactListOfItemNewArrival = (props) => {
  const { contacrOpen, handleContactOpen, RowData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        // title={`Share Own ${props.RowData.}`}
        title="Contact"
        width={drawerWidth}
        visible={contacrOpen}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleContactOpen(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <NewArrivalContactList
          RowData={RowData}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ContactListOfItemNewArrival;
