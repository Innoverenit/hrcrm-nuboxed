import React, { Component,Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import { setEmployeeViewType, handleEmployeeModal, getEmployeelist} from "./EmployeeAction";
const EmployeesHeader = lazy(() => import("./Child/EmployeesHeader"));
const AddEmployeeModal = lazy(() => import("./Child/AddEmployeeModal"));
const EmployeeCardView = lazy(() => import("./Child/EmployeeCard/EmployeeCardView"));
const EmployeeTable = lazy(() => import("./Child/EmployeeTable/EmployeeTable"));


class Employees extends Component {
  constructor(props) {
    super(props);
  this.state = { currentData: "", filter:"cretiondate", currentUser: '',selectedLocation:"",
  filteredData: this.props.employees };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getEmployeelist();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };

  handleLocationChange = (event) => {
    const locationName = event.target.value;
    this.setState({ selectedLocation: locationName });
    this.filterData(locationName, this.state.selectedDepartment);
  };
  handleDepartmentChange = (event) => {
    const departmentName = event.target.value;
    this.setState({ selectedDepartment: departmentName });
    this.filterData(this.state.selectedLocation, departmentName);
  };
  handleFilterChange=(data)=>{
    this.setState({filter:data})
    this.props.getEmployeelist(data)
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getEmployeelist();
  };

  filterData = (locationName, departmentName) => {
    const filtered = this.props.employees.filter((employee) => (
      (!locationName || employee.location === locationName) &&
      (!departmentName || employee.department === departmentName)
    ));
    this.setState({ filteredData: filtered });
  };
  componentDidUpdate(prevProps) {
    if (this.props.employees !== prevProps.employees) {
    
      this.setState({ filteredData: this.props.employees });
    }
  }

  componentDidMount(){
    this.props.getEmployeelist("cretiondate","active");
  }
  render() {
 
    const {
      setEmployeeViewType,
      addEmployeeModal,
      handleEmployeeModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <EmployeesHeader
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          handleEmployeeModal={handleEmployeeModal}
          setEmployeeViewType={setEmployeeViewType}
          viewType={viewType}
          selectedDepartment={this.state.selectedDepartment}
          selectedLocation={this.state.selectedLocation}
          handleLocationChange={this.handleLocationChange}
          handleDepartmentChange={this.handleDepartmentChange}
          handleDropdownChange={this.handleDropdownChange}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddEmployeeModal
          addEmployeeModal={addEmployeeModal}
          handleEmployeeModal={handleEmployeeModal}
        />
       <Suspense fallback={<BundleLoader />}>
        { this.props.viewType==="tile"?
        <EmployeeCardView
        filteredData={this.state.filteredData}
        filter={this.state.filter}
           viewType={viewType}
        />:
        this.props.viewType === "table" ?
        <EmployeeTable 
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
        />:
        null}
              </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  addEmployeeModal: employee.addEmployeeModal,
  viewType: employee.viewType,
  employees: employee.employees,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEmployeeViewType,
      handleEmployeeModal,
      getEmployeelist,
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
