import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button ,Select,Input} from "antd";
import {getLocationMachine,createMachinary,createMachinaryCell,getLocationMachineData} from "../../Child/Location/LocationAction"

const { Option } = Select;
const UserMachineCrd = (props) => {
  
 
  const [machine,setMachine]=useState("")
  const[machinecode,setMachineCode]=useState("")
  const[cell,setCell]=useState("")
  const[user,setUser]=useState("")
  const [selectedValues, setSelectedValues] = useState({});
  const users = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'David Johnson' },
    { value: '4', label: 'Emily Brown' },
  ];
   const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
          "1628",//  Machine
        "1629",  //>Machine  Code,//1
         "1630", // Select a cell",//2
         "1", //  Select     
          "154",//  Submit     
     
         
       
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
    useEffect(()=>{
        props.getLocationMachine();
        props.getLocationMachineData(props.currentItems.cellChamberLinkId);
       
    },[]);

    function handleChangeMachine(e) {
    
      setMachine(e.target.value)
    
    }


   


    const handleChangeCode = (e) => {
      setMachineCode(e.target.value);
    };


    


    const handleCellChange=(value)=> {
    
      setCell(value)
     
    }

    const handleSelectChange = (machinaryId, value) => {
      setSelectedValues({ ...selectedValues, [machinaryId]: value });
    };  
    const handleSubmit = (machineCode, machinaryId) => {
      const selectedValue = selectedValues[machinaryId];
      console.log('Selected Value:', selectedValue, 'Machine Code:', machineCode, 'Machine ID:', machinaryId);
      props.createMachinaryCell()
    };
    const handleSaveMachine=()=> {
      let data={
        cellChamberId:props.currentItems.cellChamberLinkId,
        cellId:props.currentItems.cellId,
        equipmentId:machine,
        equipmentNo:machinecode,
        locationId:props.locationId,
      }        
      props.createMachinary(data);
      setMachine("");
      setMachineCode("");   
    }
    return (
      <>
      <div class="flex">
      <div class="ml-2">
<div class="block"> {translatedMenuItems[0]}</div>
    <select
      placeholder= {translatedMenuItems[2]}
      style={{ width: 200 }}
      onChange={handleChangeMachine}
    
    >
      <option value=""> {translatedMenuItems[3]}</option>
      {props.locationMachine.map(machine => (
        <option 
       
        value={machine.machinaryId}>
          {machine.name}
        </option>
      ))}
      
    
    </select>
    </div>
      <div className=" ml-4" >
        <div className=" block"> {translatedMenuItems[1]}</div>
  
    <Input
     onChange={handleChangeCode}
    />
    </div>



  
    <div  className=" mt-4 ml-4">
                                         
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSaveMachine}
                                    disabled={!machinecode}
                                  
                                >
                                   {translatedMenuItems[4]} {/* Submit */}
                                </Button>
                                </div>
    
    </div>

<div className=' flex  sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">    
              
            <div className=" md:w-[6rem]"> {translatedMenuItems[0]}</div>
            <div className=" md:w-[7.2rem] "> {translatedMenuItems[1]}</div>
         
            {/* <div className=" md:w-[5.1rem]">Tag to Cell</div> */}
            <div className="w-12"></div>             </div>

           {props.locationMachineData.map((item) => {
            return (
              <div >
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">

                  <div className=" flex  md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                      <div className=" text-xs  font-poppins">
                        <div> {item.equipmentName}</div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex   md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                    <div class=" text-xs  font-poppins" style={{marginLeft:"-9em"}}>
                    
                      <div className=" text-xs  font-poppins">
                        <div> {item.equipmentNo}</div>
                      </div>
                
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
          getLocationMachineData,
          createMachinaryCell
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