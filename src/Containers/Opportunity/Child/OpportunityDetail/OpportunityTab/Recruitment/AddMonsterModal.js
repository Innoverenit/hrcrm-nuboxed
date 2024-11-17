import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
 const MonsterForm = lazy(() => import("./MonsterForm"));

const AddMonsterModal = (props) => {
  const { ...formProps } = props;
  console.log("cost",props.recruitmentId)

  return (
    <>
      <StyledModal
        // title="Opportunity"
        title={<FormattedMessage
          id="app.monsterModal"
          defaultMessage="Monster Modal"
        />}
        width="50%"
        visible={props.addMonsterModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleMonsterModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <MonsterForm 
           recruitmentId={props.recruitmentId}
         
          />
          
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddMonsterModal;
