import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button ,Select} from "antd";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";

import {getDepartments} from "../../../../Containers/Settings/Department/DepartmentAction"
import {getUserListLocation} from "../../Child/Location/LocationAction"
//import { Select } from "../../../../Components/UI/Elements";
import{getAlLoCell,createUserCell,deleteUserCell,getCellCode,getUserCell} from "../../../Event/Child/Location/LocationAction";
import { DeleteOutlined } from "@ant-design/icons";
// import ProductCellToggle from "./ProductCellToggle";



const { Option } = Select;


const UsersCellCard = (props) => {
  console.log(props.storedLoc.locationDetailsId)
  const [department,setDepartment]=useState("")
  const[cell,setCell]=useState("")
  const[user,setUser]=useState("")
  const users = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'David Johnson' },
    { value: '4', label: 'Emily Brown' },
  ];
    useEffect(()=>{
        props.getAlLoCell();
        props.getDepartments();
        props.getUserCell(props.storedLoc.locationDetailsId);
        props.getCellCode(props.storedLoc.locationDetailsId);
        // props.getUserListLocation()
    },[]);

    const handleChange=(value)=> {
      setUser(value)
     
      
      console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }



    function handleChangeDepartment(value) {
    
      setDepartment(value)
      props.getUserListLocation(props.storedLoc.locationDetailsId,value)
      
      // console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }



    const handleCellChange=(value)=> {
    
      setCell(value)
      //props.getUserListLocation(props.storedLoc.locationDetailsId,value)
      
      // console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }



    const handleSaveCell=()=> {
      let data={
        cellChamberLinkId:cell,

        // cellId:cell,
        department:department,
        locationId:props.storedLoc.locationDetailsId,
        user:user,
      }
    
      
      props.createUserCell(data);
      setCell("");
      setDepartment("");
      setUser("");
      // console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }


    const handleDelete = (item) => {
      // let data = {
      // active:false,
      //   reason: "",
      //   productId:item.productId,
      // };
       props.deleteUserCell(item.cellChamberUserLinkId);
    };

    return (
      <>
      <div class="flex justify-between" >
      <div class="ml-2">
<label class="block" >Cell Code</label>
    <Select
      placeholder="Select a cell"
      style={{ width: 200 }}
      onChange={handleCellChange}
      value={cell} 
    >
      {props.cellCode.map(cell => (
        <Option key={cell.cellChamberLinkId} value={cell.cellChamberLinkId}>
          {cell.cellChamber}
        </Option>
      ))}
    </Select>
    </div>
      <div >
        <label style={{display: 'block'}}>Department</label>
    <Select
      placeholder="Select a department"
      style={{ width: 200 }}
      onChange={handleChangeDepartment}
      value={department} 
    >
      {props.departments.map(department => (
        <Option key={department.departmentId} value={department.departmentId}>
          {department.departmentName}
        </Option>
      ))}
    </Select>
    </div>



    <div >
    <label style={{display: 'block'}}>User </label>
    <Select
      placeholder="Select a user"
      style={{ width: 200 }}
      onChange={handleChange}
      value={user} 
    >
     {props.userListLocation.map(user => (
        <Option key={user.employeeId} value={user.employeeId}>
          {user.empName}
        </Option>
         ))}
    </Select>
    </div>
    <div class="mt-[1.125rem]">
                                         
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSaveCell}
                                    //loading={props.creatingLocationCell}
                                    // style={{
                                    //     marginTop: "20px",
                                    //     marginLeft: "286px",
                                    // }}
                                >
                                    Submit
                                </Button>
                                </div>
    
    </div>

<div className=' flex justify-end sticky z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">   
                
            <div className=" md:w-[6rem]">Cell Code</div>
            <div className=" md:w-[4.2rem] ">Department</div>
         
            <div className=" md:w-[5.1rem]">User </div>
            <div className="w-12"></div>             </div>

           {props.userCell.map((item) => {
            return (
              <div >
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3">

                  <div className=" flex font-medium  md:w-[12.1rem] max-sm:w-full  ">
                    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.cellChamber}</div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex font-medium   md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs  font-poppins">
                    
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.departmentName}</div>
                      </div>
                
                    </div>

                  </div>
                  <div className=" flex font-medium  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                   
                      <div className="font-normal text-sm  font-poppins">
                        <div> {item.userName}</div>
                      </div>
                    </div>
                  </div>


                  <div className=" flex font-medium  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs  font-poppins">
                   
                      <div className="font-normal text-sm  font-poppins">
                      <StyledPopconfirm
                            title="Do you want to delete?"
                            onConfirm={() => handleDelete(item)}

                          >
                        <DeleteOutlined className="!text-red-500"/>
                        </StyledPopconfirm>
                      </div>
                    </div>
                  </div>
                 

                  {/* <div class="flex md:items-center">


                    <div class="flex flex-col w-20 max-sm:flex-row max-sm:w-[10%]">
                   <div>
                    <ProductCellToggle item={item}  particularDiscountData={props.particularDiscountData}/>
                   </div>

                    </div>
                  </div> */}

                </div>
              </div>
            );
          })} 

        </div>
      </div> 
      </>
    );
   }

const mapStateToProps = ({ auth,location,departments,distributor, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    allLoCell:location.allLoCell,
    cellCode:location.cellCode,
    userCell:location.userCell,
    departments: departments.departments,
    userListLocation:location.userListLocation

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAlLoCell,
           getDepartments,
           getUserListLocation,
           createUserCell,
           getUserCell,
           getCellCode,
           deleteUserCell
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersCellCard);
