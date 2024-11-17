
import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input,Tooltip } from "antd";

import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../Config/Auth";
import { BundleLoader } from "../../../Components/Placeholder";
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
      addDepartments(department,this.props.orgId, () => console.log("add department callback"));
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
    this.props.removeDepartments(departmentId,);
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
    const { getDepartments, getDepartmentCount,orgId,getSectors } = this.props;
    console.log();
    getDepartments(getDepartments);
    getDepartmentCount(orgId)
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
          
              <div class=" flex flex-row justify-end items-center">

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
    
        <div className="ml-2 mr-2">
  <a href={`${base_url}/excel/export/catagory/All/${this.props.orgId}?type=${"department"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
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
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                  </Button>
                  &nbsp;
                  <Button type="cancel"  onClick={this.toggleInput}>
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
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
                   <div class="text-white"> Add More</div>
                  </Button>
                </div>
               
              </>
            )}

             </div>
             
<div className=" overflow-y-auto"
           style={{ scroll:"thin"}}>
            <div class=" flex flex-col" >
            <div className="!h-[69vh] !mt-2" >
              <div>
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
                    <p>None Available</p>
                  )}
</div>
              </div>
            </div>
           
          </div>
      
  
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




// import React, {useEffect, useState } from 'react';
// import { Switch, Popconfirm } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import {
//   getDepartments,
//   // getDepartmentCount,
//   // addDepartments,
//   // searchDepartmentName,
//   // removeDepartments,
//   // updateDepartments,
//   // ClearReducerDataOfDepartment
// } from "./DepartmentAction";

// const initialDepartments = [
//   {
//     id: 1,
//     departmentName: "TechFlow",
//     erpInd: false,
//     financeInd: false,
//     fullName: null,
//     hrInd: false,
//     imInd: false,
//     inventoryInd: false,
//     logisticsInd: false,
//     mandetoryInd: false,
//     crmInd: false,
//     repairInd: false,
//   },
//   {
//     id: 2,
//     departmentName: "External",
//     erpInd: false,
//     financeInd: false,
//     fullName: null,
//     hrInd: false,
//     imInd: false,
//     inventoryInd: false,
//     logisticsInd: false,
//     mandetoryInd: false,
//     crmInd: false,
//     repairInd: false,
//   },
// ];

// const fieldLabels = {
//   mandetoryInd: 'Mandatory',
//   crmInd: 'CRM',
//   imInd: 'im',
//   hrInd: 'hr',
//   repairInd: 'repair',
//   erpInd: 'erp',
//   logisticsInd: 'logistics',
//   productionInd:"production",
//   orderManagementInd:"orderManagement",
//   procurementInd:"procurement",
//   repairInd:"repair",

// };

// const DepartmentList = (props) => {
//   const [departments, setDepartments] = useState(props.departments);


//   useEffect(() => {
//    props.getDepartments()
//   }, []);

//   const handleSwitchChange = (departmentId, field, value) => {
//     console.log({
//       id: departmentId.toString(),
//       type: fieldLabels[field],
//       value: value,
//     });

//     const updatedDepartments = departments.map(department => {
//       if (department.departmentId === departmentId) {
//         return { ...department, [field]: value };
//       }
//       return department;
//     });
//     setDepartments(updatedDepartments);
//   };

//   return (
//     <div>
//       <h1>Department Names</h1>
//       {departments.map(department => (
//         <div key={department.departmentId} style={{ marginBottom: '20px' }}>
//           <h2>{department.departmentName}</h2>
//           {Object.keys(fieldLabels).map((field) => (
//             <div key={field}>
//               <div class="font-bold text-xs font-poppins text-black">{fieldLabels[field]}: </div>
//               <Popconfirm
//                 title={`Are you sure to change ${fieldLabels[field]}?`}
//                 onConfirm={() => handleSwitchChange(department.departmentId, field, !department[field])}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <Switch
//                   checked={department[field]}
//                 />
//               </Popconfirm>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// const mapStateToProps = ({ departments, sector,auth }) => ({
//   // addingDepartments: departments.addingDepartments,
//   // addingDepartmentsError: departments.addingDepartmentsError,
//   departments: departments.departments,
//   orgId: auth.userDetails.organizationId,
//   // removingDepartments: departments.removingDepartments,
//   // removingDepartmentsError: departments.removingDepartmentsError,
//   // updatinDepartments: departments.updatingDepartments,
//   // updatingDepartmentsError: departments.updatingDepartmentsError,
//   // fetchingDepartments: departments.fetchingDepartments,
//   // fetchingDepartmentsError: departments.fetchingDepartmentsError,
//   // sectors: sector.sectors,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getDepartments,
//       // getDepartmentCount,
//       // addDepartments,
//       //  removeDepartments,
//       // updateDepartments,
//       // // getSectors,
//       // ClearReducerDataOfDepartment,
//       //searchDepartmentName
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(DepartmentList);