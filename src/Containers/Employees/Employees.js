import React, { Component,Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEmployeeViewType, handleEmployeeModal, getEmployeelist} from "./EmployeeAction";
import { BundleLoader } from "../../Components/Placeholder";
const EmployeesHeader = lazy(() => import("./Child/EmployeesHeader"));
const AddEmployeeModal = lazy(() => import("./Child/AddEmployeeModal"));
const EmployeeCardView = lazy(() => import("./Child/EmployeeCard/EmployeeCardView"));
const EmployeeTable = lazy(() => import("./Child/EmployeeTable/EmployeeTable"));


class Employees extends Component {
  constructor(props) {
    super(props);
  this.state = { currentData: "", filter:"cretiondate", currentUser: '',selectedLocation:"",
  translatedMenuItems: [],
  filteredData: this.props.employees  };

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
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
          this.fetchMenuTranslations();
        }
  }

  componentDidMount(){
    this.props.getEmployeelist("cretiondate","active");
    this.fetchMenuTranslations();
  }
  fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
          "989",//0
          "990",//1
          "1547",//2 Data Not Available
          "118",//3 Not Available
           "995",//4Reports To:
          "1548",//5Not Assigned 
           "392",//6 Pulse
           "1549",//7Required Document
           "10",// 8"Admin"
          "1551",// 9 Onboarding
          "170",//10  "Edit" 
          "1507", //11 user
          "295",//0First Name"
        "353",//1Middle Name"
        "354",//2"Last Name"
        "140",//3 Email"
        "241",// Currency4
        "357", // Dial Code"5
        "964",// Personal"6
        "685",// "Work #7
        "967",// "Date of Joining"8
        "968", // Date of Birth"9
        "547", // LinkedIn"10
        "95", // "time Zone"11
        "326",// "Department"12
        "979",// Level13
        "980",// "Role"14
        "981", // "Salary"15
        "325",// Designation"16
        "983",// Workplace"17
        "658", // "Location"18
        "985",// Job Type19
        "986",// Full Time20
        "987", // Part Time21
        "14", // Category"22
        "990", // External23
        "989",// Internal"24
        "991",// Employee Type"25
        "992",// Employee26
        "993", // Contractor27
        "1270", // Intern28
        "995", // Reports To29
        "997", // Reporting Manager30
        "998", // Secondary Department31
        "999", // Secondary Reporting Manager32
        "1246", // Update33
       "1641", // input
       "85",//  'Add'
       "110" ,// "Name",48
       "326",  // "Department",//49
        "980", // "Role",//50
         "299",// "Mobile #",//51
        "140", // "Email #",//52
        "1142", // "Stop Access",//53
        "1143", // "Multi Org"//54
        "949", //  "Active Users",55
        "228", //  "All"   56
        "1238", // "Search By Name"  57 
       "289",  // Creation Date58
       "954",  // All Locations59
       "955",  // All Departments60
     "1706", //  sort61
     "1024",//62   Functions
     "1643",//63 Custom Function
     "1078",//64Save"
     "1079",//65 Cancel"
     "1193",//66  Performance
     "1646",//67  360 View
     "981",//68 Salary
     "1202",//69 Equipment
     
        
          
        ];
  
        const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
        this.setState({ translatedMenuItems: translations });
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };
  render() {
 
    const {
      setEmployeeViewType,
      addEmployeeModal,
      handleEmployeeModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <Suspense fallback={<BundleLoader/>}>
        <EmployeesHeader
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.state.translatedMenuItems}
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
         translatedMenuItems={this.state.translatedMenuItems}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          addEmployeeModal={addEmployeeModal}
          handleEmployeeModal={handleEmployeeModal}
        />
     
        { this.props.viewType==="tile"?
        <EmployeeCardView
        translatedMenuItems={this.state.translatedMenuItems}
        translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        filteredData={this.state.filteredData}
        filter={this.state.filter}
           viewType={viewType}
        />:
        this.props.viewType === "table" ?
        <EmployeeTable 
        translatedMenuItems={this.state.translatedMenuItems}
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
