import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WidgetsIcon from '@mui/icons-material/Widgets';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import QrCodeIcon from '@mui/icons-material/QrCode';
import ContactsIcon from '@mui/icons-material/Contacts';
import PinIcon from '@mui/icons-material/Pin';
import dayjs from "dayjs";
import {getPriceUpdated } from "./SuppliesAction";
import { Input, Switch, Button, Checkbox } from 'antd';

const PriceUpdateTable = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [inputValues, setInputValues] = useState({}); 
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    useEffect(() => {
     props.getPriceUpdated(props.categoryId)
        
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
                            <div className="md:w-[8.23rem]">Suggested Price</div>
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
                                                {item.piId}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.piInquiryItemLinkId}
                                            </div>
                                        </div>
                                    </div>
                                   
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
    priceUpdated:supplies.priceUpdated
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPriceUpdated
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PriceUpdateTable);
