import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getInventorylist,inputInventorySearch,ClearReducerDataOfInventory 
} from "../../../SuppliersAction"
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { Input, Select, Button } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from '../../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import InfiniteScroll from "react-infinite-scroll-component";
import { AudioOutlined } from "@ant-design/icons"
import SuplierInventoryPublishToggle from "./SuplierInventoryPublishToggle";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url2 } from "../../../../../../Config/Auth";
import axios from "axios";

const { Option } = Select;

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

    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getInventorylist(props.userId,pageNo)
    }, []);

    useEffect(() => {
        setData(props.inventoryList || []);
    }, [props.inventoryList]);


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
              props.inputInventorySearch(currentData);
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
        <div class=" ml-6 h-6 w-60 max-sm:w-[11rem]">
                <Input
          placeholder="Search by Trade ID"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />
                  

                </div>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[92%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" w-[31.69rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Trade ID
                            </div>
                            <div className=" w-[14.11rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                            Creation 
                        </div>
                        <div className=" w-[19.1rem] max-xl:text-[0.65rem] max-xl:w-[21.1rem]">
                            Category
                            </div>
                        <div className=" w-[17.1rem] max-xl:text-[0.65rem] max-xl:w-[9.1rem]">
                            Brand
                        </div>
                        <div className=" w-[42.12rem] max-xl:text-[0.65rem] max-xl:w-[9.12rem]">
                           Model
                        </div>
                        <div className=" w-[13.23rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                          Availability Date
                        </div>
                        <div className=" w-[13.23rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                          Attribute
                        </div>
                        <div className=" w-[12.11rem] max-xl:text-[0.65rem] max-xl:w-[9.11rem]">
                            Quality
                        </div>
                        <div className=" w-[13.13rem] max-xl:text-[0.65rem] max-xl:w-[16.13rem]">
                            Specs
                        </div>
                        <div className=" md:w-[14.9rem]">
                           Unit
                        </div>
                        <div className=" md:w-[5.9rem]">
                         Price
                        </div>
                        <div className=" md:w-[5.9rem]">
                         Publish
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
                                            <div key={item.inventorySupplieId} className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" > 
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                <div className=" flex font-medium justify-between items-center  w-[15.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-xs font-poppins flex items-center">
                                                           {item.tradeId}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-xs font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                           
                                                    <div className=" flex  justify-between  w-[9.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins flex items-center">
                                                            {dayjs(item.creationDate).format("DD/MM/YYYY")}
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                    <div className=" flex  justify-between  w-[9.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" max-xl:text-[0.65rem] text-xs font-poppins flex items-center">
                                                            {item.categoryName}
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                    <div className=" flex   w-[8.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[21.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.model}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[6.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
{editsuppliesId === item.inventorySupplieId ? (
                                                                <input
          type="date"
          value={availabilityDate}
          onChange={(e) => handleDateChange(e,item)}
          min={dayjs(item.availabilityDate).format("DD/MM/YYYY")}
          class="border border-black rounded"
        /> ) : (
            <div className="font-normal text-sm  font-poppins">
              <div> 
              {dayjs(item.availabilityDate).format("YYYY/MM/DD")}</div>
            </div>
          )}
                                                        
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[6.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.attributeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[5.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" max-xl:text-[0.65rem] text-xs font-poppins">

                                                            {item.quality}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[4.32rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" max-xl:text-[0.65rem] text-xs font-poppins w-20">
                                                            {item.spces}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[6.41rem] max-xl:w-[20.41rem]  max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                           {item.unit}
                                                        </div>
                                                    </div>
                                                    <div className=" flex   w-[8.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class="  max-xl:text-[0.65rem] text-xs font-poppins">
                                                           {item.currency} {item.price}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <SuplierInventoryPublishToggle
                                  publishInventoryInd={item.publishInventoryInd}
                                  inventorySupplieId={item.inventorySupplieId}
                                />
                              </div>
                            </div>

                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                            <div className=" flex font-medium  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                      className="!text-xl cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
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
                                    && !props.fetchingInventorylist ? <NodataFoundPage /> : null}
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