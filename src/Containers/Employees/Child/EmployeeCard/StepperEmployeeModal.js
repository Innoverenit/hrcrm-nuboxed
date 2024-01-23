import React, { lazy, } from "react";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { setEditEmployee } from "../../EmployeeAction";
 const OnBoardingEmployeeForm =lazy(()=> import("./OnBoardingEmployeeForm"));



const StepperEmployeeModal = (props) => {
//   const isSmallScreen = window.innerWidth <= 600;
//     const drawerWidth = isSmallScreen ? "90%" : "55%";
  const { onboardingEmployeeModal, handleOnboardingEmployeeModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.setEditingEmployee.fullName}
        width="60%"
        visible={props.onboardingEmployeeModal}
        onClose={() => props.handleOnboardingEmployeeModal(false)}
        footer={null}
      >
       
          <OnBoardingEmployeeForm 
             employeeId={props.setEditingEmployee.employeeId}
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

