// import React, { Suspense } from "react";
// import { StyledDrawer } from "../../../Components/UI/Antd";
// import { BundleLoader } from "../../../Components/Placeholder";
// import RejectedReassignPhon from "./RejectedReassignPhon";

// const RejectedPhoneReassign = (props) => {

//     return (
//         <>
//             <StyledDrawer
//                 title={`Reassign`}
//                 width="45vw"
//                 visible={props.rejectedReassign}
//                 maskClosable={false}
//                 destroyOnClose
//                 maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
//                 style={{ top: 40 }}
//                 onCancel={() => props.handleRejectedReassignModal(false)}
//                 footer={null}
//             >
//                 <Suspense fallback={<BundleLoader />}>
//                     <RejectedReassignPhon row={props.row} />
//                 </Suspense>
//             </StyledDrawer>
//         </>
//     );


// }

// export default RejectedPhoneReassign;

