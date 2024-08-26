import React, { Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import MaterialComplementaryCard from "./MaterialComplementaryCard";

const MaterialComplementaryDrawer = (props) => {
  
  return (
    <>
      <StyledDrawer
        title={props.particularDiscountData.newSuppliesNo}
        width="60%"
        visible={props.openComplementary}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.setopenComplementary(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <MaterialComplementaryCard
            particularDiscountData={props.particularDiscountData}
            openComplementary={props.openComplementary}
            setopenComplementary={props.setopenComplementary}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MaterialComplementaryDrawer;
