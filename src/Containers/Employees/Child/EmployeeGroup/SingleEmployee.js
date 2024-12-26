import React, { Component } from "react";

import { BussinessCard } from "../../../../Components/UI/Elements";
class SingleEmployee extends Component {  
  render() {
    const { employee } = this.props;
    const employeeId = employee.employeeId;

    return (
      <>
        <BussinessCard
          primaryTitle={employee.firstName}
          imageId={employee.imageId}
          handleClick={() => this.props.history.push(`employee/${employeeId}`)}
          department={employee.department}
          subtitle1={employee.role === "ADMIN" ? "ADMIN" : employee.role === "USER" && employee.department === "Hr" ? "HR" : "EMPLOYEE"}
          subtitle2={employee.department}
          bottomBarComponent={
            !employee.emailValidationInd ? (
              <p style={{ margin: 0 }}>Awaiting registration</p>
            ) : (
                <p style={{ margin: 0 }}>Registered</p>
              )
          }   
         
        />
      </>
    );
  }
}
export default (SingleEmployee);
