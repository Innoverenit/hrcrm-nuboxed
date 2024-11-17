import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CourseForm =lazy(()=>import("./CourseForm"));

const AddCourseModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.course"
          defaultMessage="Course"
        />}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.addCourseModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleCourseModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <CourseForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCourseModal;
