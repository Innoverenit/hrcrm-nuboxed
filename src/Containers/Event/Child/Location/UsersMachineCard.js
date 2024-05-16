import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button ,Select,Input} from "antd";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";

//import {getDepartments} from "../../../../Containers/Settings/Department/DepartmentAction"
import {getLocationMachine,createMachinary,getLocationMachineData} from "../../Child/Location/LocationAction"
//import { Select } from "../../../../Components/UI/Elements";
//import{getAlLoCell,createUserCell,deleteUserCell,getCellCode,getUserCell} from "../../../Event/Child/Location/LocationAction";
import { DeleteOutlined } from "@ant-design/icons";
// import ProductCellToggle from "./ProductCellToggle";



const { Option } = Select;


const UserMachineCrd = (props) => {
  console.log(props.storedLoc.locationDetailsId)
 
  const [machine,setMachine]=useState("")
  const[machinecode,setMachineCode]=useState("")
  const[cell,setCell]=useState("")
  const[user,setUser]=useState("")
  const users = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'David Johnson' },
    { value: '4', label: 'Emily Brown' },
  ];
    useEffect(()=>{
        props.getLocationMachine();
        props.getLocationMachineData(props.storedLoc.locationDetailsId);
        // props.getDepartments();
        // props.getUserCell(props.storedLoc.locationDetailsId);
        // props.getCellCode(props.storedLoc.locationDetailsId);
        // props.getUserListLocation()
    },[]);

    function handleChangeMachine(value) {
    
      setMachine(value)
      //props.getUserListLocation(props.storedLoc.locationDetailsId,value)
      
      // console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }


   


    const handleChangeCode = (e) => {
      setMachineCode(e.target.value);
    };


    // const handleChange=(value)=> {
    //   setUser(value)
     
      
    //   console.log(`Selected user: ${value}`);
    //   // You can handle the selected user value here
    // }



    // function handleChangeDepartment(value) {
    
    //   setDepartment(value)
    //   props.getUserListLocation(props.storedLoc.locationDetailsId,value)
      
    //   // console.log(`Selected user: ${value}`);
    //   // You can handle the selected user value here
    // }



    const handleCellChange=(value)=> {
    
      setCell(value)
      //props.getUserListLocation(props.storedLoc.locationDetailsId,value)
      
      // console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }



    // const handleSaveCell=()=> {
    //   let data={
    //     cellChamberLinkId:cell,

    //     // cellId:cell,
    //     department:department,
    //     locationId:props.storedLoc.locationDetailsId,
    //     user:user,
    //   }
    
      
    //   props.createUserCell(data);
    //   setCell("");
    //   setDepartment("");
    //   setUser("");
    //   // console.log(`Selected user: ${value}`);
    //   // You can handle the selected user value here
    // }


    // const handleDelete = (item) => {
    //   // let data = {
    //   // active:false,
    //   //   reason: "",
    //   //   productId:item.productId,
    //   // };
    //    props.deleteUserCell(item.cellChamberUserLinkId);
    // };


    const handleSaveMachine=()=> {
      let data={
        machine:machine,
        machineCode:machinecode
        // cellChamberLinkId:cell,

        // // cellId:cell,
        // department:department,
        // locationId:props.storedLoc.locationDetailsId,
        // user:user,
      }
    
      
      props.createMachinary(data);
      setMachine("");
      setMachineCode("");
      // setUser("");
      // console.log(`Selected user: ${value}`);
      // You can handle the selected user value here
    }

    return (
      <>
      <div class="flex">
      <div class="ml-2">
<label class="block">Machine</label>
    <Select
      placeholder="Select a cell"
      style={{ width: 200 }}
      onChange={handleChangeMachine}
      // value={cell} 
    >
      {props.locationMachine.map(machine => (
        <Option key={machine.machinaryId} value={machine.machinaryId}>
          {machine.name}
        </Option>
      ))}
    
    </Select>
    </div>
      <div style={{marginLeft:"19px"}}>
        <label style={{display: 'block'}}>Machine Code</label>
    {/* <Select
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
    </Select> */}
    <Input
     onChange={handleChangeCode}
    />
    </div>



  
    <div style={{marginTop:"18px",marginLeft:"21px"}}>
                                         
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSaveMachine}
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
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">    
              
            <div className=" md:w-[6rem]">Machine</div>
            <div className=" md:w-[7.2rem] ">Machine Code</div>
         
            <div className=" md:w-[5.1rem]">Tag to Cell</div>
            <div className="w-12"></div>             </div>

           {/* {props.userCell.map((item) => {
            return (
              <div >
                <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3">

                  <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.cellChamber}</div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs text-cardBody font-poppins">
                    
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.departmentName}</div>
                      </div>
                
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                   
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.userName}</div>
                      </div>
                    </div>
                  </div>


                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                   
                      <div className="font-normal text-sm text-cardBody font-poppins">
                      <StyledPopconfirm
                            title="Do you want to delete?"
                            onConfirm={() => handleDelete(item)}

                          >
                        <DeleteOutlined/>
                        </StyledPopconfirm>
                      </div>
                    </div>
                  </div>
                 

              

                </div>
              </div>
            );
          })}  */}

        </div>
      </div> 
      </>
    );
   }

const mapStateToProps = ({ auth,location,departments,distributor, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    //locationId:auth.userDetails.locationId,
    allLoCell:location.allLoCell,
    cellCode:location.cellCode,
    userCell:location.userCell,
    departments: departments.departments,
    userListLocation:location.userListLocation,
    locationMachine:location.locationMachine,
    locationMachineData:location.locationMachineData

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getLocationMachine,
          createMachinary,
          getLocationMachineData
        //     getAlLoCell,
        //    getDepartments,
        //    getUserListLocation,
        //    createUserCell,
        //    getUserCell,
        //    getCellCode,
        //    deleteUserCell
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserMachineCrd);