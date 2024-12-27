import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { getCourseDetailsById } from "../../CourseAction";
import { MainWrapper } from "../../../../Components/UI/Layout";

import { BundleLoader } from "../../../../Components/Placeholder";
import CourseDetailsHeader from "./CourseDetailsHeader";
const CourseDetailsLeft =lazy(()=>import("./CourseDetailsLeft"));
const CourseDetailsRight =lazy(()=>import("./CourseDetailsRight"));

class CourseDetails extends Component {
  componentDidMount() {
     this.props.getCourseDetailsById(this.props.match.params.courseId);
  }
  render() {
    console.log(course)
    const { course, fetchingCourseDetailsById } = this.props;
    return (
      <>
        <>
          <CourseDetailsHeader />
          {fetchingCourseDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : 
          (
              <div>
                <Suspense fallback={"Loading"}>
                <div class=" flex flex-nowrap w-full"
                >
                    <div class=" w-1/4">
                      <CourseDetailsLeft course={course} />
                    </div>
                    <div class=" w-3/4">
                      <CourseDetailsRight course={course} />
                    </div> 
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ course }) => ({
    fetchingCourseDetailsById: course.fetchingCourseDetailsById,
    course: course.course,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCourseDetailsById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails)

