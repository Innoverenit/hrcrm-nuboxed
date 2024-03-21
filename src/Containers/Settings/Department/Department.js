
import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput,  } from "../../../Components/UI/Elements";
import {
  getDepartments,
  getDepartmentCount,
  addDepartments,
  searchDepartmentName,
  removeDepartments,
  updateDepartments,
  ClearReducerDataOfDepartment
} from "./DepartmentAction";
import { Select } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
const SingleDepartment = lazy(() =>
  import("./SingleDepartment")
);

const { Option } = Select;

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDepartments: [],
      isTextInputOpen: false,
      addingDepartment: false,
      departmentName: "",
      singleDepartment: "",
      sectorId: "",
      editInd: true,
      currentData: "",

    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getDepartments();
      this.props.ClearReducerDataOfDepartment();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchDepartmentName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDepartments();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSectorId = (value) =>
    this.setState({ sectorId: value });

  handleAddDepartment = () => {
    const { addDepartments, departments } = this.props;
    const { departmentName, addingDepartments, isTextInputOpen, sectorId, editInd } = this.state;
    let department = { departmentName, sectorId, editInd };

    let exist =
      departments &&
      departments.some((element) => element.departmentName == departmentName);

    // if (exist) {
    //   message.error(
    //     "Can't create as another departmentName exists with same name!"
    //   );
    // } else {
      addDepartments(department, () => console.log("add department callback"));
    // }

    this.setState({
      departmentName: "",
      singleDepartment: "",
      sectorId: "",
      sectorName: "",
      isTextInputOpen: false,
      editInd: true,
    });
  };
  handleDeleteDepartment = (departmentId={departmentId}) => {
    this.props.removeDepartments(departmentId);
    this.setState({ departmentName: "", singleDepartment: "" });
  };
  handleUpdateDepartment = (departmentId, departmentName, sectorId, sectorName, editInd, cb) => {
    this.props.updateDepartments(departmentId, departmentName, sectorId, sectorName, editInd = true, cb);
    this.setState({ departmentName: "", singleDepartment: "", sectorId: "", sectorName: "", editInd: true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  componentDidMount() {
    const { getDepartments, getDepartmentCount,getSectors } = this.props;
    console.log();
    getDepartments(getDepartments);
    getDepartmentCount(this.props.orgId)
    // getSectors();
  }
  render() {
    const {
      fetchingDepartments,
      fetchingDepartmentsError,
      departments,
      addingDepartments,
      updatingDepartments,
      values,

    } = this.props;
    const {
      isTextInputOpen,
      departmentName,
      singleDepartment,
      linkedDepartments,
      sectorId
    } = this.state;
    if (fetchingDepartments) return <BundleLoader/>;
    if (fetchingDepartmentsError) return <p>Error ...</p>;

    return (
      <>
        <div flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
              <div class=" flex flex-row justify-between">
                       <div class=" flex w-[18vw]" >
                       <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
        </div>
        {isTextInputOpen ? (
            <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
            >
              
                  <TextInput
                    placeholder="Add Department"
                    name="departmentName"
                    value={departmentName}
                    onChange={this.handleChange}
                    width={"45%"}
                    style={{ marginRight: "0.125em" }}
                  />
            
                  {/* <Select
                    style={{ width: "30%" }}
                    placeholder="Select Sectors"
                    onChange={this.handleSectorId}
                  >
                    {this.props.sectors.map((item) => {
                      return <Option value={item.sectorId}>{item.sectorName} </Option>;
                    })}
                  </Select> */}
                  &nbsp;
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!departmentName}
                    loading={addingDepartments}
                    onClick={this.handleAddDepartment}
                  // style={{ marginRight: "0.125em" }}
                  >
                    <label class="text-white"> Save</label>
                  </Button>
                  &nbsp;
                  <Button type="cancel"  onClick={this.toggleInput}>
                  <label class="text-white"> Cancel</label>
                  </Button>
              </div>
            ) : (
              <>
              
               <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={addingDepartments}
                    onClick={this.toggleInput}                
                  >
                   <label class="text-white"> Add More</label>
                  </Button>
                </div>
               
              </>
            )}
             </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
              {departments.length ? (
  departments
    .slice() 
    .sort((a, b) => a.departmentName.localeCompare(b.departmentName)) 
    .map((department, i) => (
                    <SingleDepartment
                      key={i}
                      value={singleDepartment}
                      name="singleDepartment"
                      department={department}
                      linkedDepartments={linkedDepartments}
                      updatinDepartments={updatingDepartments}
                      handleChange={this.handleChange}
                      handleSectorId={this.handleSectorId}
                      handleUpdateDepartment={this.handleUpdateDepartment}
                      sectors={this.props.sectors}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                     handleDeleteDepartment={this.handleDeleteDepartment}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}

              </MainWrapper>
            </div>
           
          </MainWrapper>
      
  
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.departments && this.props.departments.length && this.props.departments[0].updationDate).format('YYYY-MM-DD')} by {this.props.departments && this.props.departments.length && this.props.departments[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ departments, sector,auth }) => ({
  addingDepartments: departments.addingDepartments,
  addingDepartmentsError: departments.addingDepartmentsError,
  departments: departments.departments,
  orgId: auth.userDetails.organizationId,
  // removingDepartments: departments.removingDepartments,
  // removingDepartmentsError: departments.removingDepartmentsError,
  updatinDepartments: departments.updatingDepartments,
  updatingDepartmentsError: departments.updatingDepartmentsError,
  fetchingDepartments: departments.fetchingDepartments,
  fetchingDepartmentsError: departments.fetchingDepartmentsError,
  // sectors: sector.sectors,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDepartments,
      getDepartmentCount,
      addDepartments,
       removeDepartments,
      updateDepartments,
      // getSectors,
      ClearReducerDataOfDepartment,
      searchDepartmentName
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Department);