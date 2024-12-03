import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {getLocationSupplies,addLocationSuppliesValue} from "../../Main/Supplies/SuppliesAction"
import {  Button,Input, Select, } from "antd";
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
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "658",//0 Location
          "260",//1 Units
           "154",//Submit
        
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
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
    <div className='flex sticky z-auto w-[48%]'>
            <div className="rounded m-1 p-1 w-full  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                <div className="flex w-[100%]  p-1 bg-transparent font-bold sticky !text-lm font-poppins  z-10">
                    <div className=""></div>
                    <div className="w-[13.12rem] text-[#00A2E8] text-sm truncate max-md:w-[13.12rem]">{translatedMenuItems[0]}
                    Location
         
                      </div>

                      <div className="w-[22.12rem]  truncate max-md:w-[22.12rem]">{translatedMenuItems[1]}
                   Units
             
                      </div>
                
                  
                
                </div>
           
                {locationData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded mt-1 bg-white  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                <div className="flex w-[15rem] items-center border-l-2 border-green-500 bg-[#eef2f9] h-8 max-md:w-[12.1rem] max-sm:w-full ">
                                    <div 
                                    className="flex justify-between ml-gap text-xs text-[#1890ff] underline font-semibold font-poppins cursor-pointer"
                                   
                                    >
                                        {item.locationName}
                                    </div>
                                </div>

                              
                                <div className="flex w-[12.1rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center   max-md:w-[12.1rem] max-sm:w-full ">
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
              >{translatedMenuItems[2]}
                {/* Submit */}
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
