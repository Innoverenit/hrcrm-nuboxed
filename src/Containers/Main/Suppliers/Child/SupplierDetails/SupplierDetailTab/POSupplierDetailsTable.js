import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { useDispatch } from 'react-redux';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from '../../../../../../Components/Placeholder';
import {getCountries} from "../../../../../Auth/AuthAction"
import { getPurchaseOrderDetailsList, updatePriceOfPoItem } from "../../../SuppliersAction"
import { Button, DatePicker, Input,message,Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import PublicIcon from '@mui/icons-material/Public';
 import QrCodeIcon from '@mui/icons-material/QrCode';
 import ContactsIcon from '@mui/icons-material/Contacts';
 import WidgetsIcon from '@mui/icons-material/Widgets';
 import PinIcon from '@mui/icons-material/Pin';
 import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { base_url2 } from "../../../../../../Config/Auth";
import dayjs from "dayjs";
import { StyledDatePicker } from "../../../../../../Components/UI/Antd";
const { Option } = Select;
function PoSupplierDetailsTable(props) {
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [batchInput, setbatchInput] = useState();
    const [isCountryDropdownVisible, setIsCountryDropdownVisible] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("Select Country");
    const [isEditingDate, setIsEditingDate] = useState(false); // Controls editing mode
    const [selectedDate, setSelectedDate] = useState();
    const [editingRowId, setEditingRowId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
  
           "110", //"Name",//0
           "14", //"Category",//1
           "259", //   "Attribute",
           "260",//   "Unit",
           "788",//   "Price/Unit",
           "85", //   "Add",
           "1079",  //   "Cancel"
  
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);

    
    useEffect(() => {
        props.getPurchaseOrderDetailsList(props.poSupplierDetailsId);
        props.getCountries()
    }, []);

    const [price, setPrice] = useState("")
    const [edit, setEdit] = useState(false)
    const [row, setRow] = useState({})

    const handleRowData = (item) => {
        setRow(item)
    }

    const handlePrice = () => {
        setEdit(!edit)
    }
    const handleInputPrice = (val) => {
        setPrice(val)
    }
    const handleCallback = () => {
        setEdit(false)
        setPrice("")
    }

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const sendPutRequest = async (item,poSupplierSuppliesId) => {
        try {
          const response = await axios.put(
            `${base_url2}/po/updatebestBfr-cntry-BtcNo/${poSupplierSuppliesId}`,
            item,
            {
              headers: {
                Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
              },
            }
          );
           dispatch(getPurchaseOrderDetailsList(props.poSupplierDetailsId));
          if (response.data === 'Successfully !!!!') {
            message.success('Update successful');
          } else {
            console.log(response.data);
          }
        } catch (error) {
          console.error("Error updating item:", error);
        }
      };
      const handleUpdateBatchNo = (poSupplierSuppliesId) => {
        const updatedName = {
            batchNo:batchInput,
        };
       sendPutRequest(updatedName,poSupplierSuppliesId);
    //    setIsEditingBatch(false); // Close the input box after updating
       setEditingRowId(null)
      };
    const handleCountryChange = (poSupplierSuppliesId,countryId) => {
        const updatedPayload = {
          countryId:countryId // Use the selected country ID
        };
      
        sendPutRequest(updatedPayload,poSupplierSuppliesId);
        setIsCountryDropdownVisible(null); // Hide the dropdown after the request
      };
    const handleDateChange = (poSupplierSuppliesId, dateString) => {
        if (dateString) {
            // Convert the date string to ISO format with timezone
            const date = new Date(dateString);
            const isoDate = date.toISOString(); // Converts to ISO 8601 format in UTC
    
            setSelectedDate(isoDate); // Update the local state with the ISO format
            const updatedPayload = {
                bestBeforeUse: isoDate, // Include the ISO date in the payload
            };
            sendPutRequest(updatedPayload, poSupplierSuppliesId); // Send the updated payload
            setIsEditingDate(null); // Exit edit mode
        } else {
            message.error("Invalid date selected"); // Notify the user of invalid input
        }
    };
      
      
    return (
        <>
            {props.fetchingPoDetailsList ? <BundleLoader /> : <div className=' flex justify-end sticky z-auto'>
                <div class="rounded m-1 p-1   w-[100%] h-77vh  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between  w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky z-10">
                        <div className="text-[#00A2E8] text-base w-[9.1rem] md:w-[9.1rem]">
                        <ContactsIcon className=" !text-icon"/> {translatedMenuItems[0]} 
                        {/* Name" */}
                           
                            </div>

                            <div className=" w-[9.1rem]">
                       <QrCodeIcon className=" !text-icon"/> Supplies Id
                        {/* Name" */}
                           
                            </div>

                            <div className=" w-[8.1rem]">
                            <PinIcon className=" !text-icon"/>HSN
                        {/* Name" */}
                           
                            </div>
                          
                        <div className="w-[8.1rem]">
                        <WidgetsIcon className=" !text-icon"/> {translatedMenuItems[1]} 
                        {/* Category */}
                        </div>

                        <div className="w-[7.12rem] ">
                        <ModelTrainingIcon className=" !text-icon"/> {translatedMenuItems[2]} 
                         {/* Attribute */}
                        </div>
                        <div className="w-[13.13rem] ">
                        <QrCodeIcon className=" !text-icon"/> {translatedMenuItems[3]}  
                        {/* Unit */}
                        </div>
                        <div className="w-[9.14rem]">
                        <QrCodeIcon className=" !text-icon"/> {translatedMenuItems[4]}  
                        {/* Price/Unit */}
                        </div>
                        <div className="w-[6.14rem] ">
                        {/* {translatedMenuItems[4]}   */}
                        <BatchPredictionIcon className=" !text-icon"/>  Batch No
                        </div>
                        <div className="w-[7.14rem] ">
                        {/* {translatedMenuItems[4]}   */}
                        <EventBusyIcon className=" !text-icon"/> Best Before
                        </div>
                        <div className="w-[5.14rem]">
                        {/* {translatedMenuItems[4]}   */}
                        <PublicIcon className=" !text-icon"/>Origin
                        </div>
                      

                    </div>
                    <InfiniteScroll
                        dataLength={props.poDetails.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingPoDetailsList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"85vh"}
                        style={{scrollbarWidth:"thin"}}                    
                    >
                        {props.poDetails.map((item) => {
                           const date = dayjs(item.bestBefore).format("DD/MM/YYYY"); 
                            return (
                                <>
                                    <div className="flex rounded justify-between mt-[0.5rem] bg-white items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center"></div> 
                                        <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                                            <div className=" flex  justify-start  border-l-2 border-green-500 bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                        {item.suppliesFullName}
                                                    </span>

                                                </div>
                                            </div>


                                            <div className=" flex  justify-start  h-8 ml-gap  bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                       {item.suppliesId}
                                                    </span>

                                                </div>
                                            </div>

                                            <div className=" flex  justify-start  h-8 ml-gap  bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                       {item.hsn}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex  justify-start  h-8 ml-gap  bg-[#eef2f9] w-[23.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex font-normal items-center  ml-gap text-xs font-poppins">
                                                    <span>
                                                      {item.poContactPersonName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex  w-[13.2rem] items-center justify-start h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs ml-gap font-poppins">
                                                    <span>
                                                        {item.categoryName} {item.subCategoryName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex w-[12.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center  text-xs ml-gap font-poppins">
                                                    <span>
                                                        {item.attributeName} {item.subAttributeName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex  w-[4.21rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">
                                                    <span>
                                                     
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex  w-[5.12rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">
                                                    <span>
                                                       
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex  w-[3.278rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">
                                                    <span>
                                                        
                                                    </span>

                                                </div>
                                            </div>

                                            <div className=" flex  w-[8.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">
                                                    <span>
                                                        {item.unit}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex   w-[8.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                <div class="flex items-center text-xs font-poppins">

                                                    {edit && row.suppliesId === item.suppliesId ?
                                                        <>
                                                            <Input
                                                                value={price}
                                                                type="text"
                                                                placeholder="Enter Price"
                                                                onChange={(e) => handleInputPrice(e.target.value)}
                                                            />
                                                            <Button
                                                                type="primary"
                                                                onClick={() => props.updatePriceOfPoItem({
                                                                    price: price,
                                                                    supplierId: props.supplierId,
                                                                    userId: props.userId,
                                                                    suppliesId: item.suppliesId,
                                                                    poSupplierDetailsId: props.poSupplierDetailsId
                                                                }, handleCallback())}
                                                            >{translatedMenuItems[5]}</Button>
                                                            <Button onClick={handlePrice}>{translatedMenuItems[6]}</Button>
                                                        </>
                                                        : <span>
                                                            {item.price}
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                            <div>


        {editingRowId === item.poSupplierSuppliesId ? (
        <input
          type="text"
          className="h-7 w-[4rem] text-xl"
          value={batchInput}
          onChange={(e) => setbatchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdateBatchNo(item.poSupplierSuppliesId)}
          onBlur={() => handleUpdateBatchNo(item.poSupplierSuppliesId)}
          autoFocus // Focus the input automatically when editing
        />
      ) : (
        <div onClick={() => {
            setEditingRowId(item.poSupplierSuppliesId); // Enable editing mode
            setbatchInput(item.batchNo); // Set the initial value from the batchNo of the item
          }} className="cursor-pointer text-xl font-[Poppins]">
            {item.batchNo || "Enter Batch No"}
            
            </div> // Click to enter edit mode
      )}
          </div>

          <div>
  {/* Dropdown trigger */}
  

  {/* Dropdown options */}
  {/* {isCountryDropdownVisible ? ( */}
     {isCountryDropdownVisible === item.poSupplierSuppliesId ? (
    <Select
      style={{ width: "8rem" }}
      value={selectedCountry}
      onChange={(value) => {
        setSelectedCountry(value); // Update the local state with the selected country
        handleCountryChange(item.poSupplierSuppliesId,value); // Send the payload when the country is selected
      }}
      onBlur={() => setIsCountryDropdownVisible(false)} // Optionally hide dropdown on blur
    >
      {props.countries.map((country) => (
        <Option key={country.country_id} value={country.country_id}>
          {country.country_name}
        </Option>
      ))}
    </Select>
  ):(
    <div 
    // onClick={() => setIsCountryDropdownVisible(item.poSupplierSuppliesId)}
    onClick={() => {
        setIsCountryDropdownVisible(item.poSupplierSuppliesId); // Enable editing mode
        setSelectedCountry(item.countryName); // Set the initial value from the batchNo of the item
      }}  
    className="cursor-pointer"
  >
    {item.countryName || "Select"}

  </div>  
                        )}
</div>

{isEditingDate === item.poSupplierSuppliesId ? (
    <DatePicker
        className="h-7"
        value={selectedDate ? dayjs(selectedDate) : null} // Convert `selectedDate` to dayjs format
        onChange={(date, dateString) => handleDateChange(item.poSupplierSuppliesId, dateString)} // Correctly handle date selection
        autoFocus // Focus the picker when editing
    />
) : (
    <div 
        // onClick={() => setIsEditingDate(true)} 
        onClick={() => {
            setIsEditingDate(item.poSupplierSuppliesId); // Enable editing mode
            setSelectedDate(item.bestBefore); // Set the initial value from the batchNo of the item
          }} 
        className="cursor-pointer text-xl font-[Poppins]"
    >
        {date || "Select Date"} {/* Show selected date or prompt */}
    </div>
)}



                                            <div className=" flex  w-[1.5rem] max-sm:justify-between items-center justify-center h-8 ml-gap  bg-[#eef2f9]  max-sm:flex-row ">
                                                <div class="  text-xs font-poppins">
                                                    <BorderColorIcon
                                                        className=" !text-icon cursor-pointer text-[tomato]"
                                                        onClick={() => {
                                                            handlePrice()
                                                            handleRowData(item)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </InfiniteScroll>
                </div>
            </div>}

        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    poDetails: suppliers.poDetails,
    userId: auth.userDetails.userId,
    countries:auth.countries,
    fetchingPoDetailsList: suppliers.fetchingPoDetailsList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseOrderDetailsList,
            updatePriceOfPoItem,
            getCountries
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PoSupplierDetailsTable);