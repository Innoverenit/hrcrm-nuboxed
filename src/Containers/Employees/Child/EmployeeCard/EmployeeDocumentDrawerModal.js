import React, { Component,Suspense, lazy} from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const EmployeesPendingDocument  = lazy(()=> import("./EmployeesPendingDocument"));
class EmployeeDocumentDrawerModal extends Component {
  render() {
    const {
      singleEmployee: { employeeId, middleName, lastName,candidateId },
      toggleViewType,
      singleEmployee,
      employeeName,
    } = this.props;

      console.log("full",this.props.employeeName)
      console.log("full2", this.props.employeeTreeMap)
    return (
      <div>
 <StyledDrawer
           title={`${employeeName.fullName}-Required Documents`}
          width={"60%"}
          visible={this.props.addDrawerEmployeeDocumentModal}
        onClose={() => this.props.handleEmployeeDocumentDrawerModal(false)}
        
        >
          <Suspense fallback={<BundleLoader />}>
          {/* <EmployeeTreeMap
          employeeTreeMap={this.props.employeeTreeMap}
          /> */}
          <EmployeesPendingDocument employeeName={this.props.employeeName}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}/>
          
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({

  singleEmployee: employee.singleEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDocumentDrawerModal);
