import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProfileTopicOfIntrest from "../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateCards/CandidateTopicOfInterest"
import CertificationLibrary from "../../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateCards/CertificationLibrary";
const EmployeeOverviewCard = lazy(() => import("./EmployeeCards/EmployeeOverviewCard"));
const EmployeeTopicOfInterest = lazy(() => import("./EmployeeCards/EmployeeTopicOfInterest"));
const EmployeeStatusCard = lazy(() => import("./EmployeeCards/EmployeeStatusCard"));
const EmployeeAboutCard = lazy(() => import("./EmployeeCards/EmployeeAboutCard"));
const EmployeePersonalCard = lazy(() => import("./EmployeeCards/EmployeePersonalCard"));
const EmployeeCertificationLibrary = lazy(() => import("./EmployeeCards/EmployeeCertificationLibrary"));

class EmployeeDetailLeft extends Component {
  render() {
    const { singleEmployee } = this.props;
    console.log(singleEmployee)
    return (
      <div class=" flex flex-col display-block" >
        {/* <EmployeeOverviewCard singleEmployee={singleEmployee}
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage} /> */}
        {/* <EmployeeTopicOfInterest singleEmployee={singleEmployee} 
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}/>
        <EmployeeCertificationLibrary 
        singleEmployee={singleEmployee} 
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
        /> */}
 <ProfileTopicOfIntrest
         userType={"employee"}
         uniqueId={this.props.singleEmployee.employeeId}
         employeeId={this.props.singleEmployee.employeeId}
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
      translatedMenuItems={this.props.translatedMenuItems}
        />
        <CertificationLibrary
         userType={"employee"}
         uniqueId={this.props.singleEmployee.employeeId}
        employeeId={this.props.singleEmployee.employeeId}
        translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
        />

        <EmployeeStatusCard singleEmployee={singleEmployee} 
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}/>
        <EmployeeAboutCard singleEmployee={singleEmployee}
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage} />
        {/* <EmployeeDetailMap singleEmployee={singleEmployee} /> */}
        <EmployeePersonalCard singleEmployee={singleEmployee} 
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}/>
      </div>
    );
  }
}
const mapStateToProps = ({ employee }) => ({
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailLeft);
