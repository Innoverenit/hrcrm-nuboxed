import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import WidgetsIcon from '@mui/icons-material/Widgets';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import QrCodeIcon from '@mui/icons-material/QrCode';
import ContactsIcon from '@mui/icons-material/Contacts';
import PinIcon from '@mui/icons-material/Pin';
import dayjs from "dayjs";
import {getPriceUpdated } from "./SuppliesAction";
import {message } from 'antd';
import { base_url2 } from "../../../Config/Auth";
import PriceFactorList from "./PriceFactorList";

const PriceUpdateTable = (props) => {
    const [finalInput, setFinalInput] = useState("");
    const [fInput, setFInput] = useState("");
    const [editingFinalPriceId, setEditingFinalPriceId] = useState(null);
    const [editingSuggestPriceId, setEditingSuggestPriceId] = useState(null);    
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [rowData,setRowdata]=useState({})
    const [open , setOpen] = useState(false);

    useEffect(() => {
     props.getPriceUpdated(props.locationId)
        
    }, []);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
             "799",//0
              "800",//1
              "110",//2
              "14",//3
              "1154",//4
              "259",//5
              "815",//6
              "679",//7
              "1068",//8
              "1174",//9
              "1173",//10
              "742",//11
              "824",//12
              "880",//13
              "170",//14
              "264",  // Brand15
              "265",// model16
             "100", // New17
            "1608",//  Updated18
           "1247", // Material Builder19
           "1609" , //  Tag Brand20
           "1259" , //  "Do you want to delete?"21
           "1610" , //  Complimentry22
           "1252" , //  "Print"23
           "800" ,// Supplies Id24
           "1703",  //  "Best before", // 25
           "815", //  "re-order", // 26
            "1231",//   "Orders Closed", // 27
            "1232",//  "Orders Cancelled"//28
            //Price Update
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

      function handleRowData(item) {
        setRowdata(item);
      }

      const updatedata = async (updatedData, suppliesId) => {
        try {
            const response = await axios.put(
                `${base_url2}/po/update-price-po/${suppliesId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
                    },
                }
            );
    
            if (response.data === "Successfully !!!!") {
                message.success("Update successful");
                props.getPriceUpdated(props.locationId); // Refresh data after update
            } else {
                message.error("Update failed: " + response.data);
            }
        } catch (error) {
            console.error("Error updating item:", error);
            message.error("Error updating item");
        }
    };
    
    const handleUpdateField = (item, field) => {
        if (field === "finalPrice" && !finalInput) {
            message.warning("Please enter a valid final price.");
            return;
        }
        if (field === "suggestPrice" && !fInput) {
            message.warning("Please enter a valid suggested price.");
            return;
        }
    
        const updatedData = {
            locationId: props.locationId,
        };
    
        if (field === "finalPrice") {
            updatedData.finalPrice = finalInput;
        } else if (field === "suggestPrice") {
            updatedData.value = fInput;
        }
    
        updatedata(updatedData, item.suppliesId);
    
        // Reset only the relevant editing state
        if (field === "finalPrice") setEditingFinalPriceId(null);
        if (field === "suggestPrice") setEditingSuggestPriceId(null);
    };
    
    
    
    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                        <div className="text-[#00A2E8] text-sm   w-[8.5rem] truncate max-md:w-[6.522rem] ">
              {/* HSN */}
             < PinIcon className=" !text-icon"/>{translatedMenuItems[0]} ID
              </div>
              <div className=" w-[6.9rem] truncate max-md:w-[9.53rem] ">
              {/* Supplies */}
              <QrCodeIcon className="!text-icon text-[#b91372]"/>   {translatedMenuItems[24]} 
              </div>
            <div className=" w-[12.3rem] truncate max-md:w-[9.1rem] ">
              {/* Name */}
              <ContactsIcon className="!text-icon text-[#35CE8D] mr-1 "/> {translatedMenuItems[2]}
              </div>
            <div className=" w-[10.1rem] truncate max-md:w-[11.2rem] ">
              {/* Category */}
              <WidgetsIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[3]}
              </div>
            
              <div className=" w-[11.4rem]  truncate max-md:w-[11.13rem] ">
              {/* Brand*/}
              <BrandingWatermarkIcon className="!text-icon text-[#4F5D75]" />   {translatedMenuItems[15]}
              </div>
              <div className=" w-[9.135rem]  truncate max-md:w-[8.135rem] ">
              {/* Model*/}
              <ModelTrainingIcon className="text-[#4D804D] !text-icon" />  {translatedMenuItems[16]}
              </div>
            <div className=" w-[7.01rem] truncate max-md:w-[10.01rem] ">
              {/* Attribute */}
              <AttractionsIcon className=" text-[#755577] !text-icon" />  {translatedMenuItems[5]}
              </div>
                            <div className="md:w-[8.12rem]">Buying Price</div>
                            <div className="md:w-[8.13rem]">Markup Factor</div>
                            {/* <div className="md:w-[8.23rem]">Suggested Price</div> */}
                            <div className="md:w-[8.83rem]">final Price </div>
                        </div>
                        <div className="h-[83vh]">
                            {props.priceUpdated.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.paymentDate).format("DD/MM/YYYY");
                         
                                return (
                                    <>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                       
                                        <div className="flex font-medium justify-between w-[10.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.hsn}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.newSuppliesNo}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                               {item.suppliesFullName}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.categoryName}{item.subCategoryName}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.brandName}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.modelName}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.attributeName}{item.subAttributeName}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.suggestPrice}
                                               
    {/* <div className="text-xs font-poppins">
        {editingSuggestPriceId === item.suppliesId ? (
            <input
                type="text"
                className="h-7 w-[4rem] text-sm"
                value={fInput}
                onChange={(e) => setFInput(e.target.value)}
                onKeyDown={(e) =>
                    e.key === "Enter" && handleUpdateField(item, "suggestPrice")
                }
                onBlur={() => handleUpdateField(item, "suggestPrice")}
                autoFocus
            />
        ) : (
            <div
                onClick={() => {
                    setEditingSuggestPriceId(item.suppliesId); // Track suggestPrice editing
                    setFInput(item.suggestPrice || ""); // Pre-fill with current value
                }}
                className="cursor-pointer text-xl font-[Poppins]"
            >
                {item.suggestPrice || "Enter Suggested Price"}
            </div>
        )}
    </div> */}

                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins"
                                             onClick={() => {
                                                if (rowData.suppliesId === item.suppliesId && open) {
                                                    setOpen(false);
                                                    setRowdata({});
                                                } else {
                                                    setOpen(true);
                                                    setRowdata(item);
                                                }
                                            }}
                                            >
                                             Open
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {/* {item.finalPrice} */}
                                              
                                                <div className="flex w-[7.1rem]">
    <div className="text-xs font-poppins">
        {editingFinalPriceId === item.suppliesId ? (
            <input
                type="text"
                className="h-7 w-[4rem] text-sm"
                value={finalInput}
                onChange={(e) => setFinalInput(e.target.value)}
                onKeyDown={(e) =>
                    e.key === "Enter" && handleUpdateField(item, "finalPrice")
                }
                onBlur={() => handleUpdateField(item, "finalPrice")}
                autoFocus
            />
        ) : (
            <div
                onClick={() => {
                    setEditingFinalPriceId(item.suppliesId); // Track finalPrice editing
                    setFinalInput(item.finalPrice || ""); // Pre-fill with current value
                }}
                className="cursor-pointer text-xl font-[Poppins]"
            >
                {item.finalPrice || "Enter Final Price"}
            </div>
        )}
    </div>
</div>




                                            </div>
                                        </div>
                                    </div>
                                    {open && item.suppliesId === rowData.suppliesId && (
    <div>
       <PriceFactorList
       rowData={rowData}
       />
    </div>
)}
                                    </>
                                )
                               
                                
                            })}
                        </div>
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ supplies, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    priceUpdated:supplies.priceUpdated,
    locationId:auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPriceUpdated
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PriceUpdateTable);
