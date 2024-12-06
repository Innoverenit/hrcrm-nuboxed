import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { getInventory } from "../Inventory/InventoryAction"
import {handleSuppliesLocationModal} from "../Supplies/SuppliesAction"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Select} from "antd";
import { bindActionCreators } from "redux";
import AddSuppliesLocationModal from "./AddSuppliesLocationModal"

const { Option } = Select;


export const SuppliesLocationTable = (props) => {
  const [page, setPage] = useState(0);
  const [zone, setZone] = useState([]);
  const [locationData, setLocationData] = useState(props.locationSupplies);
  const [rack, setRack] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [currentLocationId, setCurrentLocationId] = useState("");
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
//   const handleSubmit = (id,item) => {
//     console.log("Reorder level value:", inputValues[id]);
//     let data={
//       reorderLevel:inputValues[id],
//       locationDetailsId:item.locationDetailsId,
//       suppliesId:props.particularDiscountData.suppliesId
//     }

//     props.addLocationSuppliesValue(data,props.particularDiscountData.suppliesId)
//     // After submitting, mark it as submitted to hide the submit button
//     setSubmitted({
//       ...submitted,
//       [id]: true,
//     });
//   };

function handleSetCurrentLocationId(item) {
  setCurrentLocationId(item);
  // console.log("opp",item);
}

  useEffect(() => {
    props.getInventory(props.orgId)
}, []);
  return (
    <>
    <div className='flex sticky z-auto'>
            <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky !text-lm font-poppins  z-10">
                    <div className=""></div>
                    <div className="w-[22.12rem] text-[#00A2E8] text-sm truncate max:w-[22.12rem]">
                    <LocationOnIcon className='!text-icon   '/>     Location
                      {/* <FormattedMessage id="app.manufactureid" defaultMessage="Manufacture ID" /> */}
                      </div>
                </div>
           
                {props.inventory.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex  md:w-[12.1rem] max-sm:w-full ">
                                    <div 
                                    className="flex justify-between text-xs text-[#1890ff] underline font-semibold font-poppins cursor-pointer"
                                    onClick={() => {
              
                                        props.handleSuppliesLocationModal(true);
                                        handleSetCurrentLocationId(item);
                                      }}
                                    >
                                        {item.locationName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
             
            </div>
        </div>
        <AddSuppliesLocationModal
        currentLocationId={currentLocationId}
        addSuppliesLocationModal={props.addSuppliesLocationModal}
        handleSuppliesLocationModal={props.handleSuppliesLocationModal}
        />

        </>
  )
}


const mapStateToProps = ({ waranty, inventory,auth,production,supplies }) => ({
    //addDrawerWarantyModal:waranty.addDrawerWarantyModal
    locationSupplies: supplies.locationSupplies,
    orgId: auth.userDetails.organizationId,
    inventory: inventory.inventory,
    addSuppliesLocationModal:supplies.addSuppliesLocationModal
});
const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getInventory,
    handleSuppliesLocationModal
    // getLocationSupplies,
    // addLocationSuppliesValue
    // handleWarantyDrawerModal
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesLocationTable)
