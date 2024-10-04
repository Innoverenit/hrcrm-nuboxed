import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from "react-intl";
import {getLocationSupplies,addLocationSuppliesValue} from "../../Main/Supplies/SuppliesAction"
//import AddWarantyDrawerModal from "../Waranty/AddWarantyDrawerModal"
import ButtonGroup from "antd/lib/button/button-group";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
 import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Tooltip, Button,Input,message, Popconfirm, Select,Switch } from "antd";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";




const { Option } = Select;


export const LocationSuppliesList = (props) => {
  const [page, setPage] = useState(0);
  const [zone, setZone] = useState([]);
  const [locationData, setLocationData] = useState(props.locationSupplies);
  const [rack, setRack] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
console.log(inputValues)
  const handleInputChange = (id, value) => {
    setInputValues({
      ...inputValues,
      [id]: value === "" ? "" : value, // Allow empty string values
    });
  };
  

  // const handleInputChange = (id, value) => {
  //   setInputValues({
  //     ...inputValues,
  //     [id]: value,
  //   });
  // };

  // Handle submit action
  const handleSubmit = (id,item) => {
    console.log("Reorder level value:", inputValues[id]);
    let data={
      reorderLevel:inputValues[id],
      locationDetailsId:item.locationDetailsId,
      suppliesId:props.particularDiscountData.suppliesId
    }

    props.addLocationSuppliesValue(data,props.particularDiscountData.suppliesId)
    // After submitting, mark it as submitted to hide the submit button
    setSubmitted({
      ...submitted,
      [id]: true,
    });
  };

  useEffect(() => {
    props.getLocationSupplies(props.orgId,props.particularDiscountData.suppliesId)
}, []);



useEffect(() => {
  // Check if data is available
  if (props.locationSupplies.length > 0) {
    // Update activeTab when data is available
    setLocationData(props.locationSupplies);
  }
}, [props.locationSupplies]);



 



 

  return (
    <>
    <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky text-xs font-poppins  z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]">
                    Location
                      {/* <FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /> */}
                      </div>

                      <div className="md:w-[22.12rem]">
                   Units
                      {/* <FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /> */}
                      </div>
                
                  
                
                </div>
           
                {locationData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex  md:w-[12.1rem] max-sm:w-full ">
                                    <div 
                                    className="flex justify-between text-xs text-[#1890ff] underline font-semibold font-poppins cursor-pointer"
                                   
                                    >
                                        {item.locationName}
                                    </div>
                                </div>

                              
                                <div className="flex  md:w-[12.1rem] max-sm:w-full ">
                                    <div 
                                    className="flex justify-between text-xs text-[#1890ff] underline font-semibold font-poppins cursor-pointer"
                                   
                                    >
                                <Input
            
              onChange={(e) => handleInputChange(item.locationDetailsId, e.target.value)}
              // value={item.reorderLevel}
              value={inputValues[item.locationDetailsId] !== undefined 
                ? inputValues[item.locationDetailsId] 
                : item.reorderLevel}
            />
           
            {inputValues[item.locationDetailsId] && !submitted[item.locationDetailsId] && (
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={() => handleSubmit(item.locationDetailsId,item)}
              >
                Submit
              </Button>
            )}
            </div>
            </div>



                              
                              


                                



                              




                                               

                            

                            </div>
                        </div>
                    );
                })}
             
            </div>
        </div>

        </>
  )
}


const mapStateToProps = ({ waranty, inventory,auth,production,supplies }) => ({
    //addDrawerWarantyModal:waranty.addDrawerWarantyModal
    locationSupplies: supplies.locationSupplies,
    orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getLocationSupplies,
    addLocationSuppliesValue
    // handleWarantyDrawerModal
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LocationSuppliesList)
