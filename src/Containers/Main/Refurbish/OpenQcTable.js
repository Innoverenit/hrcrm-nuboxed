import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOpenQcByUser } from "./RefurbishAction";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { Badge } from "antd";
import { BundleLoader } from '../../../Components/Placeholder';
import InfiniteScroll from "react-infinite-scroll-component";

function OpenQcTable(props) {

    const [page, setPage] = useState(0);
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
            {props.fetchingOpenQc ? <BundleLoader /> : <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[34.12rem]"><FormattedMessage
                            id="app.order"
                            defaultMessage="order"
                        /></div>
                        <div className=" md:w-[35.1rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        /></div>
                        {/* <div className=" md:w-[9.8rem] ">
    <FormattedMessage
                        id="app.units"
                        defaultMessage="Units"
                      /></div> */}
                        <div className="md:w-[6.6rem]"></div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                            id="app.status"
                            defaultMessage="Status"
                        /></div>
                        {/* <div className="md:w-[4.3rem]"></div> */}
                    </div>
                    <div class="overflow-y-auto h-[67vh]">
                        <InfiniteScroll
                            dataLength={props.openQc.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOpenQc ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.openQc.map((item) => {
                                return (
                                    <div>
                                        <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 ">
                                            <div class="flex">
                                                <div className=" flex font-medium  md:w-[32.6rem] max-sm:w-full  ">
                                                    <Badge size="small" count={`${item.qcCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class=" cursor-pointer w-[7rem] flex">
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>

                                                </div>

                                                <div className=" flex font-medium   md:w-[22.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.dueDate === null ? "" : moment(item.dueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                {/* <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                               <div class=" text-sm text-cardBody font-poppins">
                               {item.qcCompletePhoneCount}/{item.totalPhone}
                               </div>
                           </div> */}
                                            </div>

                                            <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
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
