import React, { Suspense,useState } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
 import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
//import {handleRecruiterModal} from "../../../../OpportunityAction"
import RecruiterTab from "./RecruiterTab"

const AddRecruiterModal = (props) => {
  console.log("Best3",props.candidatePostData)
  console.log("Best4",props.recruiter)
    const { addRecruiterModal, handleRecruiterModal, ...formProps } = props;
    const [selectedRowRecruiter, setSelectedRowRecruiter] = useState([]);

  const rowSelectionForRecruiter = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowRecruiter(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  return (
    <>
      <StyledDrawer
        title="Candidate"
      
        width="95%"
        visible={props.addRecruiterModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleRecruiterModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
  <RecruiterTab
          
          rowSelectionForRecruiter={rowSelectionForRecruiter}
         candidatePostData={props.candidatePostData}
         recruiter={props.recruiter}
         //recruitmentId={props.recruitmentId}
          opportunityId={props.opportunityId}/>{" "}


        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ settings,opportunity }) => ({
   // addRecruiterModal:opportunity.addRecruiterModal
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        // handleRecruiterModal,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(AddRecruiterModal);




  
