import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const ProgramForm =lazy(()=>import("./ProgramForm"));


const AddProgramModal = (props) => {
    console.log("clicked");
  return (
  
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.program"
          defaultMessage="Program"
        />}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.addProgramModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleProgramModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProgramForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddProgramModal;
