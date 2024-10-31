import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import EmailContactList from "./EmailContactList";
import NewArrivalItemList from "./NewArrivalItemList";




const SuppliesListOfItemNewArrival = (props) => {
  const { open, handleOpen, RowData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        // title={`Share Own ${props.RowData.}`}
        title="Contact List"
        width={drawerWidth}
        visible={open}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleOpen(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <NewArrivalItemList
          RowData={RowData}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SuppliesListOfItemNewArrival;
