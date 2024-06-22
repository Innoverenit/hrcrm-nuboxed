import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOpenRepair } from "./RefurbishAction";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { Badge } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../Components/Placeholder";

function OpenRepairTable(props) {

    const [page, setPage] = useState(0);
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
            {props.fetchingOpenRepairByUser ? <BundleLoader /> : <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[34.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.order"
                            defaultMessage="order"
                        /></div>
                        <div className=" w-[35.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.duedate"
                            defaultMessage="duedate"
                        /></div>
                        <div className=" md:w-[9.8rem] "><FormattedMessage
                            id="app.lead"
                            defaultMessage="Lead"
                        /></div>
                        <div className="w-[6.6rem]"></div>
                        <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                            id="app.notes"
                            defaultMessage="notes"
                        /></div>
                    </div>
                    <div class="overflow-y-auto h-[67vh]">
                        <InfiniteScroll
                            dataLength={props.openRepair.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingOpenRepairByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.openRepair.map((item) => {
                                const currentdate = moment().format("DD/MM/YYYY");
                                const date = moment(item.creationDate).format("DD/MM/YYYY");
                                return (
                                    <div>
                                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col ">
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                                <div className=" flex font-medium  w-[28.8rem] max-xl:w- max-sm:w-auto  ">
                                                    <Badge size="small" count={`${item.repairCompletePhoneCount} / ${item.totalPhone}`} overflowCount={5000}>
                                                        <span class="text-sm cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                            {item.newOrderNo}
                                                        </span>
                                                    </Badge>
                                                </div>

                                                <div className=" flex font-medium   w-[29.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.repairDueDate === null ? "" : moment(item.repairDueDate).format("DD-MM-YYYY")}
                                                    </div>

                                                </div>
                                                {/* <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
<div class=" text-sm text-cardBody font-poppins">
                               {item.repairCompletePhoneCount}/{item.totalPhone}
                               </div>
                           </div> */}
                                            </div>
                                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[11.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium  w-[10.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.reason}

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
