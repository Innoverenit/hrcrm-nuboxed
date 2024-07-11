import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getInventorylist,inputInventorySearch,ClearReducerDataOfInventory
   
} from "../../../SuppliersAction"
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { Input, Select,  } from 'antd';
import dayjs from "dayjs";
import NodataFoundPage from '../../../../../../Helpers/ErrorBoundary/NodataFoundPage';
import InfiniteScroll from "react-infinite-scroll-component";
import { AudioOutlined } from "@ant-design/icons"
import SuplierInventoryPublishToggle from "./SuplierInventoryPublishToggle";


const { Option } = Select;

function InventoryTable(props) {
    const [pageNo, setPageNo] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    useEffect(() => {
        setPageNo(pageNo + 1);
        // props.getCurrency()
        // props.getPurchaseSuppliersList(props.supplier.supplierId);
        props.getInventorylist(props.userId,pageNo)
    }, []);
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [currency, setCurrency] = useState("")
    const [showIcon, setShowIcon] = useState(false)
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

    const [hasMore, setHasMore] = useState(true);
    
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
                         Pubish
                        </div>
                    </div>
                    <div class="">
                        <InfiniteScroll
                            dataLength={props.inventoryList.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingInventorylist ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.inventoryList.length ? <>
                                {props.inventoryList.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                        <>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >
                                                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                                <div className=" flex font-medium justify-between items-center  w-[15.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                           {item.tradeId}
                                                           

                                                        </div>
                                                        {date === currentdate ? (
                                                                <div class="text-xs font-bold text-[tomato] mr-4">
                                                                    New
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                           
                                                    <div className=" flex font-medium justify-between  w-[9.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                            {dayjs(item.creationDate).format("DD/MM/YYYY")}
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                    <div className=" flex font-medium justify-between  w-[9.25rem] max-xl:w-[27.25rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins flex items-center">
                                                            {item.categoryName}
                                                           

                                                        </div>
                                                        
                                                    </div>
                                                    <div className=" flex font-medium  w-[8.1rem] max-xl:w-[10.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins">
                                                            {item.brand}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[21.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins">

                                                            {item.model}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[6.2rem] max-xl:w-[10.2rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins">

                                                            {item.attributeName}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[5.1rem] max-xl:w-[20.1rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins">

                                                            {item.quality}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[4.32rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins w-20">
                                                            {item.spces}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[6.41rem] max-xl:w-[20.41rem]  max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins">
                                                           {item.unit}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium  w-[8.01rem] max-xl:w-[18.01rem] max-sm:justify-between  max-sm:flex-row ">
                                                        <div class=" font-normal max-xl:text-[0.65rem] text-[0.85rem]  font-poppins">
                                                           {item.currency} {item.price}
                                                        </div>
                                                    </div>
                                                    <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <SuplierInventoryPublishToggle
                                  publishInventoryInd={item.publishInventoryInd}
                                  inventorySupplieId={item.inventorySupplieId}
                                />
                              </div>
                            </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                                : !props.inventoryList.length
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