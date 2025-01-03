import React, { Component,lazy,Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader} from "../../../Components/Placeholder";

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
        <Suspense fallback={<BundleLoader/>}>
          <ActionHeader
            leftComponent={
              <EmployeesActionLeft
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
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
            translatedMenuItems={this.props.translatedMenuItems}
              />
            }
            rightComponent={
              <EmployeesActionRight 
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
              handleEmployeeModal={handleEmployeeModal}
              translatedMenuItems={this.props.translatedMenuItems} />
            }
          />
          </Suspense>
        </div>

        
      </>
    );
  }
}

export default EmployeesHeader;
