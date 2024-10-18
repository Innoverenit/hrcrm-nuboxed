import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const NotifyDrawerForm=lazy(()=>import("./NotifyDrawerForm"));

function  OpenNotifyDrawer (props) {


     const { openNotifydrwr, handleNotifyDrawer, currentEmployeeId,...formProps } =props;
   
     return (
      <>
        <StyledDrawer
          title={"Assign as Admin"}
          width="60%"
          visible={openNotifydrwr}
          closable
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => handleNotifyDrawer(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <NotifyDrawerForm currentEmployeeId={currentEmployeeId}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}/>
        </Suspense>
        </StyledDrawer>
      </>
    );

};


  export default OpenNotifyDrawer;
