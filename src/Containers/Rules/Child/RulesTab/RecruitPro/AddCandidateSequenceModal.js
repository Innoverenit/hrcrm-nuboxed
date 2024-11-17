import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const SequenceCandidateForm = lazy(() => import("./SequenceCandidateForm"));

const AddCandidateSequenceModal = (props) => {
  // const {
  //   sequence: { name,  },
  
  // } = props;

  console.log("sequence4",props.sequenceDetail)
 

  return (
    <>
      <StyledDrawer  title="sequence"
      // {props.name}
       
        width="28%"
        visible={props.candidateSequenceModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleCAndidateSequenceModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
 <SequenceCandidateForm 
//  sequenceId={props.sequenceId}
sequenceId={props.item.sequenceId}
 sequenceDetail={props.sequenceDetail}

 />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
// const mapStateToProps = ({ profile, auth,settings,customer }) => ({
//   sequence: settings.sequence, 
  
// });

export default AddCandidateSequenceModal;
