import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import OpportunityCTable from "./OpportunityCTable";


const OppoOpenDrawer = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Opportunity : ${props.RowData.name}`} 
        width="50%"
        visible={props.openOpportunity}
        onClose={() => props.setOpenOpportunity(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
       <OpportunityCTable 
       RowData={props.RowData}
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText}
               translatedMenuItems={props.translatedMenuItems}
       />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default OppoOpenDrawer;
