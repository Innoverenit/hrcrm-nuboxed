import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import AssignedOpenDrawerForm from "./AssignedOpenDrawerForm";

const AsignedOpenDrawer = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={`Reassigned : ${props.RowData.name}`} 
        width="35%"
        visible={props.asignedDrawer}
        onClose={() => props.setasignedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AssignedOpenDrawerForm {...formProps}     RowData={props.RowData}    distributorId={props.RowData.distributorId}
                 setasignedDrawer={props.setasignedDrawer}
                 asignedDrawer={props.asignedDrawer}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AsignedOpenDrawer;
