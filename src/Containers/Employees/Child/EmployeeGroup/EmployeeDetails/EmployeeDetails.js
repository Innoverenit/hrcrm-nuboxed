import React, {useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getEmployeeById } from "../../../EmployeeAction";

const EmployeeDetailHeader = lazy(() => import("./EmployeeDetailHeader"));
const EmployeeDetailLeft = lazy(() => import("./EmployeeDetailLeft"));
const EmployeeDetailRight = lazy(() => import("./EmployeeDetailRight"));

function EmployeeDetails(props) {
  const { employeeId, data } = useParams();
    useEffect(() => {
      props.getEmployeeById(employeeId);
      }, [employeeId]);
  // componentDidMount() {
  //   props.getEmployeeById(props.match.params.id);
  //   console.log(props.location);
  // }

  // render() {
    const { singleEmployee, fetchingEmployeeById } = props;

    console.log(props.employeeId);
    return (
      <>
        <EmployeeDetailHeader />
        {props.fetchingEmployeeById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <div class=" flex ">
            <Suspense fallback={""}>
              <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[25%] overflow-scroll h-[98vh]" >
                <Suspense>
                  <EmployeeDetailLeft  singleEmployee= {singleEmployee}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}/>
                   </Suspense>
                </div>
                <div class=" w-[75%]" >
                  <Suspense>
                  <EmployeeDetailRight singleEmployee= {singleEmployee}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage}/>
                   </Suspense>
                </div>
              </div>
            </Suspense>
          </div>
        )}
      </>
    );
  }


const mapStateToProps = ({ employee }) => ({
  fetchingEmployeeById: employee.fetchingEmployeeById,
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getEmployeeById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
