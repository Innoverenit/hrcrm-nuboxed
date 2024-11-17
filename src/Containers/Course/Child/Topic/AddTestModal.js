import React, {lazy,Suspense } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {handleTestDrawerModal} from "../../CourseAction"
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const TestForm =lazy(()=>import("../Test/TestForm"));

const AddTestModal = (props) => {

  const { addTestDrawerModal, handleTestDrawerModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Test"
        width="60%"
        style={{marginTop:"3rem"}}
        visible={props.addTestDrawerModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleTestDrawerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
      
          <TestForm 
         
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ course }) => ({
    addTestDrawerModal:course.addTestDrawerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleTestDrawerModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddTestModal);


