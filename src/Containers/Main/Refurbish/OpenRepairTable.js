import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOpenRepair } from "./RefurbishAction";
import dayjs from "dayjs";
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { Badge } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";
import DateRangeIcon from '@mui/icons-material/DateRange';

function OpenRepairTable(props) {

    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "1068", // "order",//0
              "203",  // "duedate",//1
               "677", //   "Lead"
                "316",   // "notes"
    
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
        setPage(page + 1);
        props.getOpenRepair(props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getOpenRepair(props.userId)
    };

    return (
        <>
            {props.fetchingOpenRepairByUser ? <BundleLoader /> : <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">
                        <div className=" w-[34.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {/* "order */} <DynamicFeedIcon className='!text-base mr-1  text-[#e4eb2f]'/>{translatedMenuItems[0]}
                        </div>
                        <div className=" w-[35.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> <DateRangeIcon className="!text-icon "/>{translatedMenuItems[1]}</div>
                        <div className=" md:w-[9.8rem] "> <ContactsIcon className='!text-base  text-[#e4eb2f]'/> {translatedMenuItems[2]}</div>
                        <div className="w-[6.6rem]"></div>
                        <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[3]}
                        </div>
                    </div>
                    <div class="overflow-y-auto h-[67vh]">
                        <InfiniteScroll
                            dataLength={props.openRepair.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOpenRepairByUser ? <div><BundleLoader/></div> : null}
                            height={"75vh"}
                            style={{ scrollbarWidth:"thin"}}
                        >
                            {props.openRepair.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div>
                                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex">
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                                                <div className=" flex w-[28.8rem] max-xl:w- max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.repairCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="text-xs cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                </div>

                                                <div className=" flex  w-[29.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.repairDueDate === null ? "" : dayjs(item.repairDueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                               
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex   w-[11.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    

                                                    </div>
                                                </div>
                                                <div className=" flex  w-[10.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.reason}

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>

            </div>}
        </>
    )

}

const mapStateToProps = ({ refurbish, auth }) => ({
    fetchingOpenQc: refurbish.fetchingOpenQc,
    userId: auth.userDetails.userId,
    openRepair: refurbish.openRepair,
    fetchingOpenRepairByUser: refurbish.fetchingOpenRepairByUser,
    locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOpenRepair
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OpenRepairTable);
