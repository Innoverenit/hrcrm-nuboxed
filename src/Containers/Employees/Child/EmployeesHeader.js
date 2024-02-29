import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const EmployeesActionLeft = lazy(() => import("./EmployeesActionLeft"));
const EmployeesActionRight = lazy(() => import("./EmployeesActionRight"));
class EmployeesHeader extends Component {
  render() {
    const { handleEmployeeModal,
       viewType, setEmployeeViewType ,
       handleChange,
      currentData,
      handleClear,} = this.props;
    return (
      <>
        <div>
          <ActionHeader
            leftComponent={
              <EmployeesActionLeft
                viewType={viewType}
                setEmployeeViewType={setEmployeeViewType}
                currentData={currentData}
                handleClear={handleClear}
                handleChange={handleChange}
                handleLocationChange={this.props.handleLocationChange}
                handleDepartmentChange={this.props.handleDepartmentChange}
                selectedDepartment={this.props.selectedDepartment}
                selectedLocation={this.props.selectedLocation}
                handleDropdownChange={this.props.handleDropdownChange}
                handleFilterChange={this.props.handleFilterChange}
                filter={this.props.filter}
                setCurrentData={this.props.setCurrentData}
              />
            }
            rightComponent={
              <EmployeesActionRight handleEmployeeModal={handleEmployeeModal} />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default EmployeesHeader;
