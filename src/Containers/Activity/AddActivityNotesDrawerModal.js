import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
import MainNotes from "../CustomNote/MainNotes";
//import AccountOpportunityStepper from "./AccountOpportunityStepper";

const AddActivityNotesModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
       title="Notes"
        width="75%"
        destroyOnClose
        visible={props.addActivityNotesModal}
        onClose={() => props.handleActivityNoteModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <MainNotes
             type={props.type}
             uniqueId={props.uniqueId}
            />
          {/* <AccountOpportunityStepper {...formProps} />{" "} */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddActivityNotesModal;
