// import React, { useEffect,useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button ,Select,Input} from "antd";
// import { StyledPopconfirm } from "../../../../Components/UI/Antd";

// //import {getDepartments} from "../../../../Containers/Settings/Department/DepartmentAction"
// import {createMachinaryCell,getUserMachineCard} from "../../Child/Location/LocationAction"
// //import { Select } from "../../../../Components/UI/Elements";
// //import{getAlLoCell,createUserCell,deleteUserCell,getCellCode,getUserCell} from "../../../Event/Child/Location/LocationAction";
// import { DeleteOutlined } from "@ant-design/icons";
// import { Autocomplete, TextField } from '@mui/material';
// // import ProductCellToggle from "./ProductCellToggle";



// const { Option } = Select;


// const UserCellMachineCrd = (props) => {
//   //console.log(props.storedLoc.locationDetailsId)
 
  
//   const users = [
//     { value: '1', label: 'John Doe' },
//     { value: '2', label: 'Jane Smith' },
//     { value: '3', label: 'David Johnson' },
//     { value: '4', label: 'Emily Brown' },
//   ];
//   const [selectedMachines, setSelectedMachines] = useState([]);

//   // Function to handle changes in the selected machines
//   const handleChangeMachine = (event, newValue) => {
//     setSelectedMachines(newValue);
//   };
//     useEffect(()=>{
//         props.getUserMachineCard(props.userId);
       
//     },[]);

   


//     const handleSaveMachine=()=> {
//       let data={
        

      
//       }
    
      
//       props.createMachinaryCell(data)
//     //   setMachine("");
//     //   setMachineCode("");
//       // setUser("");
//       // console.log(`Selected user: ${value}`);
//       // You can handle the selected user value here
//     }
// console.log(selectedMachines)
//     return (
//       <>
//       <div class="flex">
//       <div class="ml-2">
// <label class="block">Machine</label>
//     {/* <select
//       placeholder="Select a cell"
//       style={{ width: 200 }}
//       //onChange={handleChangeMachine}
//       // value={cell} 
//     >
//       {users.map(machine => (
//         <option 
//         // key={machine.machinaryId} 
//         value={machine.value}>
//           {machine.label}
//         </option>
//       ))}
      
    
//     </select> */}
//      {/* <Select
//         multi
//         // placeholder="Select a cell"
//         style={{ width: 200 }}
//         // onChange={handleChangeMachine}
//         // value={selectedMachines}
//       >
//         {users.map(machine => (
//           <Option key={machine.value} value={machine.value}>
//             {machine.label}
//           </Option>
//         ))}
//       </Select> */}

// <Autocomplete
//       multiple
//       options={users}
//       getOptionLabel={(option) => option.label}
//       value={selectedMachines}
//         onChange={(event, newValue) => handleChangeMachine(newValue)}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           variant="outlined"
//           label="Select a cell"
//           placeholder="Select a cell"
//         />
//       )}
//       style={{ width: 200 }}
//     />
//     </div>
//       {/* <div style={{marginLeft:"19px"}}>
//         <label style={{display: 'block'}}>Machine Code</label>
   
   
//     </div> */}



  
//     <div style={{marginTop:"18px",marginLeft:"21px"}}>
                                         
//                                         <Button
//                                     type="primary"
//                                     htmlType="submit"
//                         onClick={handleSaveMachine}
//                                     // disabled={!machinecode}
//                                     //loading={props.creatingLocationCell}
//                                     // style={{
//                                     //     marginTop: "20px",
//                                     //     marginLeft: "286px",
//                                     // }}
//                                 >
//                                     Submit
//                                 </Button>
//                                 </div>
    
//     </div>


//       </>
//     );
//    }

// const mapStateToProps = ({ auth,location,departments,distributor, }) => ({
//     userId: auth.userDetails.userId,
//     orgId:auth.userDetails.organizationId,
//     //locationId:auth.userDetails.locationId,
//     userMachineCard:location.userMachineCard,
    
//     locationMachine:location.locationMachine,
//     locationMachineData:location.locationMachineData

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//         //   getLocationMachine,
//         //   createMachinary,
//         //   getLocationMachineData,
//            createMachinaryCell,
//            getUserMachineCard
//         //     getAlLoCell,
//         //    getDepartments,
//         //    getUserListLocation,
//         //    createUserCell,
//         //    getUserCell,
//         //    getCellCode,
//         //    deleteUserCell
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(UserCellMachineCrd);


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Autocomplete, TextField } from '@mui/material';
import { FormattedMessage } from "react-intl";
import { createMachinaryCell,getLocationMachine, getUserMachineCard } from "../../Child/Location/LocationAction";

const UserCellMachineCrd = (props) => {
  const users = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'David Johnson' },
    { value: '4', label: 'Emily Brown' },
  ];
  
  const [selectedMachines, setSelectedMachines] = useState([]);

  const handleChangeMachine = (event, newValue) => {
    setSelectedMachines(newValue);
  };

  useEffect(() => {
    props.getLocationMachine();
    props.getUserMachineCard(props.userId);
  }, [props.userId]);

  const handleSaveMachine = () => {
    let data = {
      // Your data structure to save
      equipmentIds: selectedMachines.map(machine => machine.machinaryId),
      user:props.userId,
    };
    props.createMachinaryCell(data);
    console.log("Selected Machines: ", data.machines); // Log selected machines as array of values
  };

  return (
    <>
      <div className="flex">
        <div className="ml-2">
          <label className="block">Machine</label>
          <Autocomplete
            multiple
            options={props.locationMachine}
            getOptionLabel={(option) => option.name}
            value={selectedMachines}
            onChange={handleChangeMachine}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select a machine"
                placeholder="Select a machine"
              />
            )}
            style={{ width: 548 }}
          />
        </div>
        <div style={{ marginTop: "18px", marginLeft: "21px" }}>
          <Button
            type="primary"
            onClick={handleSaveMachine}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className='flex justify-end sticky z-auto'>
            <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.equipment" defaultMessage="Equipment" /></div>
                  

                </div>
              
                {props.userMachineCard.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm  font-semibold font-poppins">
                                        {item.name}
                                    </div>
                                </div>

                               

                              
                              
                            </div>
                        </div>
                    );
                })}
               
            </div>
        </div>
    </>
  );
};

const mapStateToProps = ({ auth, location }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  userMachineCard: location.userMachineCard,
  locationMachine: location.locationMachine,
  //locationMachineData: location.locationMachineData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createMachinaryCell,
      getUserMachineCard,
      getLocationMachine
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCellMachineCrd);

