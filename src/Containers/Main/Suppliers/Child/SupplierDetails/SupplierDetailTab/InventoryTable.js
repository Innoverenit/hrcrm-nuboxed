import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getInventorylist,inputInventorySearch,ClearReducerDataOfInventory 
} from "../../../SuppliersAction"
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { Input, Select, Button } from 'antd';
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import { AudioOutlined } from "@ant-design/icons"
import SuplierInventoryPublishToggle from "./SuplierInventoryPublishToggle";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url2 } from "../../../../../../Config/Auth";
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from "axios";
import QrCodeIcon from "@mui/icons-material/QrCode";
import WidgetsIcon from "@mui/icons-material/Widgets";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import AttractionsIcon from "@mui/icons-material/Attractions";
import PublishIcon from "@mui/icons-material/Publish";
import DateRangeIcon from '@mui/icons-material/DateRange';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmptyPage from "../../../../EmptyPage";

const { Option } = Select;

dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
  const now = dayjs();
  const creationDay = dayjs(creationDate);

  if (creationDay.isSame(now, 'day')) {
      return 'Today';
  } else {
      return creationDay.from(now); 
  }
};
function InventoryTable(props) {
    const [pageNo, setPageNo] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [rowData, setRowData] = useState({});
    const [currency, setCurrency] = useState("");
    const [showIcon, setShowIcon] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [data, setData] = useState([]);
    const [availabilityDate, setavailabilityDate] = useState('');
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getInventorylist(props.userId,pageNo)
    }, []);

    useEffect(() => {
        setData(props.inventoryList || []);
    }, [props.inventoryList]);

    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
            "649",//0 Trade ID
            "679",//1  Created
            "14",//2 Category
            "264",//3 Brand
            "265",//4 Model
            "1275",//5 Availability Date
            "259",//6 Attribute
            "654",//7  Quality
            "655",//8  Specs
            "260",//9 Units
            "657",//10 Price
            "739",//11 Publish
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
    const handleRowData = (item) => {
        setRowData(item)
    }

    const handleCurrencyField = () => {
        setShowIcon(!showIcon)

    }
    const handleChangeCurrency = (val) => {
        setCurrency(val)
    }
    const handleCallback = () => {
        setShowIcon(false)
        setCurrency("")
    }

    const handleDateChange = (e, item) => {
            setavailabilityDate(e.target.value);
       
    };
    
    const handleLoadMore = () => {
        const callPageMapd = props.inventoryList && props.inventoryList.length &&props.inventoryList[0].pageCount
        setTimeout(() => {
          const {
            getInventorylist,
           // userDetails: { employeeId },
          } = props;
          if  (props.inventoryList)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getInventorylist(props.userId,pageNo); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

      const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
      useEffect(() => {
        if (transcript) {
          console.log(">>>>>>>", transcript);
          setCurrentData(transcript);
        }
        }, [ transcript]);
        const handleChange = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
                setPageNo(pageNo + 1);
               props.getInventorylist(props.userId,pageNo)
               props.ClearReducerDataOfInventory()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
              // Perform the search
              props.inputInventorySearch(props.supplier.supplierId,currentData);
              setSearchOnEnter(true);  //Code for Search
            } else {
              console.error("Input is empty. Please provide a value.");
            }
          };
          const suffix = (
            <AudioOutlined
              onClick={SpeechRecognition.startListening}
              style={{
                fontSize: 16,
                color: '#1890ff',
              }}
        
            />
          );
          
          const handleEditClick = (inventorySupplieId) => {
            setEditsuppliesId(inventorySupplieId);
          };
          const handleCancelClick = (inventorySupplieId) => {
            setEditedFields((prevFields) => ({ ...prevFields, [inventorySupplieId]: undefined }));
            setEditsuppliesId(null);
          };
        
          const handleSave = async (item) => {
            console.log(item)
            const updatedItem = {
                orgId:props.organizationId,
                userId:props.userId,
                // shipBy: item.shipBy, 
                availabilityDate: new Date(availabilityDate).toISOString()
            };
              
         console.log("resd",updatedItem);  
         try {

            const response = await axios.put(`${base_url2}/supplier/inventory/update/availabilityDate/${item.inventorySupplieId}`, updatedItem, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            console.log("API Response:", response.data);
            setData(prevData => 
              prevData.map(cat =>
                cat.inventorySupplieId === item.inventorySupplieId ? response.data : cat
              )
            );
                    setEditsuppliesId(null);
                } catch (error) {
                    console.error("Error updating item:", error);
                    setEditsuppliesId(null);
                  }
          };
        
    return (
        <>
        <div class=" ml-2 h-6 w-60 max-sm:w-[11rem]">
                <Input
          placeholder="Search by Trade ID"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
                  

                </div>
            <div className=' flex justify-end sticky mt-3  z-auto'>
                <div class="rounded m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[100%] p-1 bg-transparent font-bold sticky top-0 z-10">
                    <div className="text-[#00A2E8] text-base w-[17.69rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]"> <QrCodeIcon className=" !text-icon"/>{translatedMenuItems[0]}
                            {/* Trade ID */}
                            </div>
                            <div className=" w-[19.11rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]"><QrCodeIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[1]}
                            {/* Creation  */}
                        </div>
                        <div className=" w-[29.1rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]"><WidgetsIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[2]}
                            {/* Category */}
                            </div>
                        <div className=" w-[34.1rem] max-xl:text-[0.65rem] max-xl:w-[9.1rem]"><BrandingWatermarkIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[3]}
                            {/* Brand */}
                        </div>
                        <div className=" w-[27.12rem] max-xl:text-[0.65rem] max-xl:w-[9.12rem]"><ModelTrainingIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[4]}
                           {/* Model */}
                        </div>
                       
                        <div className=" w-[13.24rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]"><AttractionsIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[6]}
                          {/* Attribute */}
                        </div>
                        <div className=" w-[11.11rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]"><VerifiedUserIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[7]}
                            {/* Quality */}
                        </div>
                        <div className=" w-[11.13rem] max-xl:text-[0.65rem] max-xl:w-[16.13rem]"><QrCodeIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[8]}
                            {/* Specs */}
                        </div>
                        <div className=" w-[15.23rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]"><DateRangeIcon className='!text-icon text-[#9ad5ca]  '  /> {translatedMenuItems[5]}
                          {/* Availability Date */}
                        </div>
                        <div className="w-[7.9rem] md:w-[7.9rem]"><QrCodeIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[9]}
                           {/* Unit */}
                        </div>
                        <div className="w-[15.8rem] md:w-[15.8rem]"><QrCodeIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[10]}/{translatedMenuItems[9]}
                         {/* Price */}
                        </div>
                        <div className="w-[15.9rem] md:w-[15.9rem]"><PublishIcon className=" !text-icon text-[#9ad5ca]"/> {translatedMenuItems[11]}
                         {/* Publish */}
                        </div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={data.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInventorylist ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"79vh"}
                            style={{scrollbarWidth:"thin"}}
                        >
                            {data.length ? <>
                                {data.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div key={item.inventorySupplieId} className="flex rounded justify-between mt-1 py-1 bg-white items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" > 
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9] font-medium justify-between items-center  w-[8.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row  ">
                                                        <div class=" font-normal ml-gap max-xl:text-[0.65rem] text-xs font-poppins flex items-center">
                                                           {item.tradeId}                                                      

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-xs font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                           
                                                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6.25rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                                                    <div className=" flex   items-center truncate justify-start h-8 ml-gap bg-[#eef2f9] w-[12.24rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" max-xl:text-[0.65rem] ml-gap text-xs font-poppins flex items-center">
                                                            {item.categoryName}
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                    <div className=" flex   w-[14.1rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="flex items-center ml-gap  max-xl:text-[0.65rem] text-xs font-poppins">
                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[17.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[15.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" flex items-center ml-gap  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.model}
                                                        </div>
                                                    </div>
                                             
                                                    <div className=" flex  w-[8.3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.3rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="flex items-center   max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.attributeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[5.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="flex items-center  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.quality}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[4.32rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="flex items-center  max-xl:text-[0.65rem] text-xs font-poppins w-20">
                                                            {item.spces}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[8.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="flex items-center   max-xl:text-[0.65rem] text-xs font-poppins">
{editsuppliesId === item.inventorySupplieId ? (
                                                                <input
          type="date"
          value={availabilityDate}
          onChange={(e) => handleDateChange(e,item)}
          min={dayjs(item.availabilityDate).format("DD/MM/YYYY")}
          class="border border-black rounded"
        /> ) : (
            <div className="font-normal text-xs  font-poppins">
              <div> 
              {dayjs(item.availabilityDate).format("YYYY/MM/DD")}</div>
            </div>
          )}
                                                        
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[4.41rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[20.41rem]  max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="flex items-center   max-xl:text-[0.65rem] text-xs font-poppins">
                                                           {item.unit}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[6.01rem]  justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[18.01rem] max-sm:justify-between items-center max-sm:flex-row ">
                                                        <div class="flex items-center   max-xl:text-[0.65rem] text-xs font-poppins">
                                                           {item.currency} {item.price}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[5.6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs flex items-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <SuplierInventoryPublishToggle
                                  publishInventoryInd={item.publishInventoryInd}
                                  inventorySupplieId={item.inventorySupplieId}
                                />
                              </div>
                            </div>

                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.inventorySupplieId ? (
                        <>
                      <Button 
                      type="primary"
                    //   loading={props.updatingOrdrSuplrItems}
                      onClick={() => handleSave(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.inventorySupplieId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.inventorySupplieId)}
                      />
                    )}
    </div>
                                                        </div>
                                                </div>

                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !data.length
                                    && !props.fetchingInventorylist ? <EmptyPage /> : null}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
           
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    inventoryList: suppliers.inventoryList,
    userId: auth.userDetails.userId,
    organizationId: auth.userDetails.organizationId,
    addlocationInPo: suppliers.addlocationInPo,
    addPoListmModal: suppliers.addPoListmModal,
    addTermsnCondition: suppliers.addTermsnCondition,
    currencies: auth.currencies,
    inventoryList:suppliers.inventoryList,
    fetchingInventorylist:suppliers.fetchingInventorylist,
    fetchingInventorylist: suppliers.fetchingInventorylist
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getInventorylist,
            inputInventorySearch,
            ClearReducerDataOfInventory
            // getPurchaseSuppliersList,
            // handlePoLocationModal,
            // handlePoListModal,
            // handleTermsnConditionModal,
            // getCurrency,
            // addCurrencyInPo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);