import React, {  Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import PriceAddCard from "./PriceAddCard";
import PriceDiscountCard from "./PriceDiscountCard";
import PriceDiscountCardB2C from "./PriceDiscountCardB2C";

const PriceModal = (props) => {
  const { priceOpenModal, handlePriceModal, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Price"
        width={drawerWidth}
        visible={priceOpenModal}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handlePriceModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <div class="font-semibold ">Price</div>
          <PriceAddCard particularDiscountData={particularDiscountData} />
          <div class="font-semibold ">Discount B2B</div>
          <PriceDiscountCard particularDiscountData={particularDiscountData} />
          <div class="font-semibold ">Discount B2C</div>
          <PriceDiscountCardB2C particularDiscountData={particularDiscountData} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default PriceModal;
