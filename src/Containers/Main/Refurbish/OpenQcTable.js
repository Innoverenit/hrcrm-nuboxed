import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOpenQcByUser } from "./RefurbishAction";
import dayjs from "dayjs";
import ContactsIcon from '@mui/icons-material/Contacts';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import DateRangeIcon from '@mui/icons-material/DateRange';

import { Badge } from "antd";
import { BundleLoader } from '../../../Components/Placeholder';
import InfiniteScroll from "react-infinite-scroll-component";

function OpenQcTable(props) {

    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
             "660", // "order",//0
              "760",  // "duedate",//1
               "677", //   "Lead"
                "142",   // "Status"
             
    
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
        props.getOpenQcByUser(props.userId)
    }, [])
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getOpenQcByUser(props.userId)
    };
    return (
        <>
            {props.fetchingOpenQc ? <BundleLoader /> : 
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs  sticky  z-10">
                        <div className="text-base text-[#00A2E8] md:w-[34.12rem]">   <DynamicFeedIcon className='!text-base mr-1  text-[#e4eb2f]'/> {translatedMenuItems[0]} #</div>
                        <div className=" md:w-[35.1rem]">
                     <DateRangeIcon className="!text-icon "/>    {translatedMenuItems[1]}  {/* "duedate"
                        /> */}
                        </div>
                        <div className=" md:w-[9.8rem] ">
                        <ContactsIcon className='!text-base  text-[#e4eb2f]'/>  {translatedMenuItems[2]}   {/*Lead"
                            /> */}
                            </div>
                        <div className="md:w-[6.6rem]"></div>
                        <div className="md:w-[5.8rem]">
                        <UpdateIcon className='!text-icon text-[#ff66b3]' /> {translatedMenuItems[3]}  {/* "Status"
                        /> */}
                        </div>
                        {/* <div className="md:w-[4.3rem]"></div> */}
                    </div>
                    <div class="overflow-y-auto h-[67vh]">
                        <InfiniteScroll
                            dataLength={props.openQc.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOpenQc ? <div><BundleLoader/></div> : null}
                            height={"75vh"}
                        >
                            {props.openQc.map((item) => {
                                return (
                                    <div>
                                        <div className="flex rounded justify-between mt-1 bg-white  items-center py-ygap-1  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                            <div class="flex items-center">
                                                <div className=" flex font-medium  md:w-[32.6rem] max-sm:w-full  ">
                                                    <Badge size="small" count={`${item.qcCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class=" cursor-pointer w-[7rem] flex">
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>

                                                </div>

                                                <div className=" flex font-medium   md:w-[22.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.dueDate === null ? "" : dayjs(item.dueDate).format("DD-MM-YYYY")}
                                                    </div>
                                                </div>                                       
                                            </div>

                                            <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                    {item.reason}
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
    openQc: refurbish.openQc,
    locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getOpenQcByUser
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OpenQcTable);
