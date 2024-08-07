import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const TeamsForm =lazy(()=> import('./TeamsForm'));


const TeamsModal = props => {
  const { addTeamsModal, handleTeamsModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Teams"
        width="60%"
        visible={addTeamsModal}
        closable
        destroyOnClose
        onClose={() => handleTeamsModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <TeamsForm {...formProps}
           
       translateText={props.translateText}
     
       selectedLanguage={props.selectedLanguage} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default TeamsModal;