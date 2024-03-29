import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import CourseActionRight from "./CourseActionRight";
class CourseHeader extends Component {
  render() {
    const { handleCourseModal, viewType, setCourseViewType } = this.props;
    return (
      <>
 <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
          <ActionHeader
            rightComponent={
              <CourseActionRight
                viewType={viewType}
                handleCourseModal={handleCourseModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default CourseHeader;
