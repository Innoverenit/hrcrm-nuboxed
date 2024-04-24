import React, { lazy, } from "react";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { setEditEmployee } from "../../EmployeeAction";
 const OnBoardingEmployeeForm =lazy(()=> import("./OnBoardingEmployeeForm"));



const StepperEmployeeModal = (props) => {
//   const isSmallScreen = window.innerWidth <= 600;
//     const drawerWidth = isSmallScreen ? "90%" : "55%";
  const { onboardingEmployeeModal,currentEmployeeId, handleOnboardingEmployeeModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={currentEmployeeId.fullName}
        width="72%"
        destroyOnClose
        visible={props.onboardingEmployeeModal}
        onClose={() => props.handleOnboardingEmployeeModal(false)}
        footer={null}
      >
       
          <OnBoardingEmployeeForm 
           userStageList={props.userStageList}
          currentEmployeeId={currentEmployeeId}
          employeeName={props.employeeName}
            //  employeeId={props.setEditingEmployee.employeeId}
            />
   
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, employee }) => ({
    setEditingEmployee: employee.setEditingEmployee,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
        setEditEmployee
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepperEmployeeModal);

