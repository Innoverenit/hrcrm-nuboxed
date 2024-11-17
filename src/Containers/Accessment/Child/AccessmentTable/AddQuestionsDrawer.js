import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const AddQuestionForm = lazy(() => import("../../Child/AccessmentTable/AddQuestionsForm"));


class AddQuestionsDrawer extends Component {
  render() {
    const { addQuestionModal, handleQuestionrModal, rowData,...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title={rowData.assessmentName}

          width="60%"
          visible={addQuestionModal}
          closable
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onClose={() => handleQuestionrModal(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <AddQuestionForm rowData={rowData}/>{" "}
        </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddQuestionsDrawer;
